/**
 * ************************************
 *
 * @module promClient.js
 * @author team Buoy
 * @description Sets up class for Prometheus client listeners to fetch data using IPC
 *
 * ************************************
 */

const { ipcMain } = require('electron');
const fetch = require('node-fetch');

// Note: Remember to make functionality that allows custom queries, otherwise likely not feasible to collect big 4
// Note: Remember to rewrite the cpu/mem queries to allow selection by namespace/node, as it stands they only collect
//       aggregate of all containers across cluster except for totalCpu which returns cpu for single container which 
//       only works for practice clusters running on a single machine


// Add field for user to specify tcp for blackbox exporter in network page, add new querying helper
class PromClient{

      /**
   * Initialize our connection to the Kubernetes API
   * @param { BrowserWindow } window 
   */
    constructor(window) {
        
        // query strings to access metric information from Prometheus
        this.cpuQ = 'sum(rate(container_cpu_usage_seconds_total[10m]))/sum(machine_cpu_cores)*100'
        this.memQ = 'sum(container_memory_working_set_bytes / container_memory_usage_bytes)'
        this.totalMemQ = 'container_memory_working_set_bytes'
        this.totalCpuQ = 'machine_cpu_cores'
        //this.nginxLatencyQ = (label, value) => {return `controller_upstream_server_response_latency_ms_count[15ms]{${label}=${value}}`}
        //this.nginxErrorRateQ = (label, value) => {return '100 - (nginx_http_requests_total[15m] / nginx_connections_accepted[5m]) * 100'}
        // this.probeLatency = `sum(rate(${this.target}_all_duration_seconds_sum[10m])) / sum(rate(${this.target}_all_duration_seconds_count[10m]))`
        // this.probeLatency = `sum(rate(all_duration_seconds_sum[10m])) / sum(rate(all_duration_seconds_count[10m]))`
        this.probeLatency = `rate(http_response_time_sum{application="myapp",handler="myHandler", status="200"}[1m])
        /
        rate(http_response_time_count{application="myapp",handler="myHandler", status="200"}[1m])`
        // this.probeErrorRate = `sum(${this.target}_http_request_errors_total) / sum(${this.target}_http_requests_total) * 100`
        this.probeErrorRate = `sum(http_request_errors_total) / sum(http_requests_total) * 100`
        //this.probeSaturation = 
        // this.probeReqPerSec = `sum(rate(${this.target}_http_requests_count[1m]))`
        this.probeReqPerSec = `sum(rate(http_requests_total[1m]))`
        this.endpoint = "http://localhost:9090"
        this.baseUrl = "/api/v1/"
        this.queryPath = 'query?query=';
 
        this.target = "probe";
        this.window = window;
        
        // arrays to iterate through channels and query strings simultaneously
        this.channelArr = ['cpu-usage', 'mem-usage', 'cpu-total', 'mem-total'];
        this.queryArr = [this.cpuQ, this.memQ, this.totalCpuQ, this.totalMemQ];
        this.probeChannelArr = ['latency', 'error-rate', 'req-per-sec'];
        this.probeQueryArr = [this.probeLatency, this.probeErrorRate, this.probeReqPerSec];
        
        // helper functions to bind to the constructor class
        this.hardwareQueries = this.hardwareQueries.bind(this);
        this.hardwareQueries(this.channelArr, this.queryArr);
        this.networkQueries = this.networkQueries.bind(this);
        this.networkQueries(this.probeChannelArr, this.probeQueryArr);

        // helper variables/methods to organize custom queries from user
        this.customTypeArr = [];
        this.customQueryArr = [];
        this.getInput = this.getInput.bind(this);
        this.getInput();
        this.customQueries = this.customQueries.bind(this);
        this.customQueries(this.customTypeArr, this.customQueryArr);

        this.getNodesCpuUsage = this.getNodesCpuUsage.bind(this);
        this.getNodesCpuUsage();

        this.getNodesMemoryUsagePercent = this.getNodesMemoryUsagePercent.bind(this);
        this.getNodesMemoryUsagePercent();

        this.getNodesMemoryUsageMb = this.getNodesMemoryUsageMb.bind(this);
        this.getNodesMemoryUsageMb(); 
        
        this.getNodesPodsCpuUsage = this.getNodesPodsCpuUsage.bind(this);
        this.getNodesPodsCpuUsage();

        this.getNodesPodsMemoryUsage = this.getNodesPodsMemoryUsage.bind(this);
        this.getNodesPodsMemoryUsage();

        this.getPortNumber = this.getPortNumber.bind(this);
        this.getPortNumber();
    }

    // function to fetch the inputs from the user when submitted
    getInput(){
        ipcMain.on('add:custom-query', (e, type, query) => {
            this.customTypeArr.push(type);
            this.customQueryArr.push(query);
        })
    }

    // function to fetch the specific data based off of user inputted queries
    customQueries(type, query){
        // creates listener that, on activation, loopps through customType and Query arrays sending fetch requests
        // with those querys. Returns are saved in a array which is sent via event emitter after loop
        ipcMain.on(`load:custom-queries`, async () => {
        const metrics = [];
        if (query.length > 0){
        for (let i=0; i < query.length; i++){
            try { 
                const rawres = await fetch(this.endpoint + this.baseUrl + `${type[i]}?query=` + query[i]);
                const res = await rawres.json();
                const data = await res.data.result[0].value[1];
                metrics.push(data)
                //this.window.webContents.send(`get:custom-queries`, data);
            }
            catch(err) {
                console.error('Error in Custom Queries: ', err)
            };
        };
    }
        this.window.webContents.send('get:custom-queries', metrics);
    }); 
    };

    // Changes the stored target for network queries
    getPortNumber() {
      ipcMain.on('get:prom-target', (e, data) => {
         this.target = `${data}`;
         console.log('new target:', this.target);
        });  
      return;  
    }

    // function to fetch metrics from the query string involving 'probe' (latency, error rate, req per sec)
    networkQueries(probeChannelArr, probeQueryArr){
        for (let i=0; i < probeChannelArr.length; i++){
            ipcMain.on(`load:${probeChannelArr[i]}`, async () => {
                try { 
                    // const rawres = await fetch(probeQueryArr[i]);
                    const rawres = await fetch(this.endpoint + this.baseUrl + 'query?query=' + probeQueryArr[i]);
                    // console.log('raw network response:', rawres);
                    const res = await rawres.json();
                    // console.log(`network response for ${probeChannelArr[i]}:`, res);
                    // const data = await res.data.result
                    this.window.webContents.send(`get:${probeChannelArr[i]}`, res);
                }
                catch(err) {
                    console.error('Error in Network Queries: ', err);
                }
        })
      }
    }

    /**
     * 
     * @param {array} channelArr 
     * @param {array} queryArr 
     */
    // function to fetch metrics from the query string involving 'query' (cpu, memory, totals)
    hardwareQueries(channelArr, queryArr){
        // loops through query array, making channel for each which, on activation, sends 
        // get req to prometheus api with queryArr query
        for (let i=0; i < queryArr.length; i++){
            ipcMain.on(`load:${channelArr[i]}`, async () => {
            try { 
                const rawres = await fetch(this.endpoint + this.baseUrl + 'query?query=' + queryArr[i]);
                const res = await rawres.json();
                const data = await res.data.result[0].value[1];
                this.window.webContents.send(`get:${channelArr[i]}`, data);
            }
            catch(err) {
                console.error('Error in Hardware Queries', err)
            }
        })
      }
    }

    // function to fetch the cpu usage per node 
    getNodesCpuUsage() {
        ipcMain.on('load:NodeCPUUsage', async () => {
            setInterval( 
                async () => {
                    try {
                        // array to hold list of nodes & their associated CPU usage
                        const nodeCPUUsageArr = [];

                        // fetch request to get CPU usage per node
                        const nodeCPUUsageQuery = `100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[1m])) * 100)`;
                        const queryRequestURI = this.endpoint + this.baseUrl + this.queryPath + encodeURIComponent(nodeCPUUsageQuery);

                        const response = await fetch(queryRequestURI);
                        const responseJSON = await response.json();

                        // data.result holds our array of metrics
                        const results = responseJSON.data.result;

                        // map our results to an array
                        results.map( result => {
                            nodeCPUUsageArr.push({
                                name: result.metric.instance,
                                resourceUsage: Number(result.value[1]).toFixed(2)
                            })
                        });

                        this.window.webContents.send('get:NodeCPUUsage', nodeCPUUsageArr);
                    } catch (err) {
                        console.error('Error in Nodes CPU Usage:', err);
                    }
                }, 2000);

        });
    }

    // function to fetch the memory usage per node
    getNodesMemoryUsagePercent() {
        ipcMain.on('load:NodeMemoryUsagePercent', () => {
            setInterval( async () => {

                const nodeMemoryUsageArr = [];

                // current Memory Usage per node
                const nodeMemoryUsageQuery = `100 * (1 - (node_memory_MemFree_bytes + node_memory_Cached_bytes + node_memory_Buffers_bytes) / node_memory_MemTotal_bytes)`;

                const queryRequestURI = this.endpoint + this.baseUrl + this.queryPath + encodeURIComponent(nodeMemoryUsageQuery);

                const response = await fetch(queryRequestURI);
                const responseJSON = await response.json();     
                
                // data.result holds our array of metrics
                const results = responseJSON.data.result;

                results.map( result => {
                    nodeMemoryUsageArr.push(
                        {
                            name: result.metric.instance,
                            resourceUsage: Number(result.value[1]).toFixed(2)
                        }
                    )
                });

                this.window.webContents.send('get:NodeMemoryUsagePercent', nodeMemoryUsageArr);
            
            }, 2000);
        });
    }

    getNodesMemoryUsageMb() {
        ipcMain.on('load:NodeMemoryUsageMB', () => {
            setInterval( async () => {
                const nodeMemoryUsageArr = [];
                const nodeMemoryUsageQuery = `node_memory_MemTotal_bytes - (node_memory_MemFree_bytes + node_memory_Buffers_bytes + node_memory_Cached_bytes)`;

                const queryRequestURI = this.endpoint + this.baseUrl + this.queryPath + encodeURIComponent(nodeMemoryUsageQuery);
                
                const response = await fetch(queryRequestURI);
                const responseJSON = await response.json(); 

                const results = responseJSON.data.result;
                results.map( result => {
                    const memoryInMB = Number(result.value[1]) / (10 ** 6);
                    nodeMemoryUsageArr.push({
                        name: result.metric.instance,
                        resourceUsage: memoryInMB.toFixed(2),
                    })
                });

                this.window.webContents.send('get:NodeMemoryUsageMB', nodeMemoryUsageArr);
            }, 2000);
        });
    };

    getNodesPodsCpuUsage(){

        ipcMain.on('load:NodesPodsCpuUsage', () => {
            setInterval( async () => {
                const nodesPodsCpuUsageArr = {};
                const nodesPodsUsageQuery = `(sum(rate(container_cpu_usage_seconds_total[1m])) by (pod, namespace, node) /
                sum(container_spec_cpu_quota/container_spec_cpu_period) by (pod, namespace, node)) * 100`;

                const queryRequestURI = this.endpoint + this.baseUrl + this.queryPath + encodeURIComponent(nodesPodsUsageQuery);
                
                const response = await fetch(queryRequestURI);
                const responseJSON = await response.json(); 

                const results = responseJSON.data.result;
                results.map( result => {

                    const nodeName = result.metric.node;
                    const podName = result.metric.pod;
                    const resourceUsage = Number(result.value[1]).toFixed(2);

                    if (!(Object.hasOwn(nodesPodsCpuUsageArr, nodeName))) {
                        nodesPodsCpuUsageArr[nodeName] = [{
                            name: podName,
                            resourceUsage: resourceUsage
                        }]
                    } else {
                        nodesPodsCpuUsageArr[nodeName].push({
                            name: podName,
                            resourceUsage: resourceUsage
                        })
                    }
                    
                });
                this.window.webContents.send('get:NodesPodsCpuUsage', nodesPodsCpuUsageArr);
            }, 2000);
        });

    }

    getNodesPodsMemoryUsage(){
        ipcMain.on('load:NodesPodsMemoryUsage', () => {
            setInterval(async () => {
                const nodesPodsMemoryUsageArr = {};
                const nodesPodsMemoryPercentQuery = `100 * max(container_memory_working_set_bytes / on (container, pod, node)kube_pod_container_resource_limits{resource="memory"}) by (pod, node)`;

                const queryRequestURI = this.endpoint + this.baseUrl + this.queryPath + encodeURIComponent(nodesPodsMemoryPercentQuery);
                
                const response = await fetch(queryRequestURI);
                const responseJSON = await response.json(); 

                const results = responseJSON.data.result;
                results.map( result => {

                    const nodeName = result.metric.node;
                    const podName = result.metric.pod;
                    const resourceUsage = Number(result.value[1]).toFixed(2);

                    if (!(Object.hasOwn(nodesPodsMemoryUsageArr, nodeName))) {
                        nodesPodsMemoryUsageArr[nodeName] = [{
                            name: podName,
                            resourceUsage: resourceUsage
                        }]
                    } else {
                        nodesPodsMemoryUsageArr[nodeName].push({
                            name: podName,
                            resourceUsage: resourceUsage
                        })
                    }
                    
                });
                this.window.webContents.send('get:NodesPodsMemoryUsage', nodesPodsMemoryUsageArr);           
            }, 2000);
            
        });
    }
};

module.exports = PromClient;