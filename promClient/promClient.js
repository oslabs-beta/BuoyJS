
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
        
        this.cpuQ = 'sum(rate(container_cpu_usage_seconds_total[10m]))/sum(machine_cpu_cores)*100'
        this.memQ = 'sum(container_memory_working_set_bytes / container_memory_usage_bytes)'
        this.totalMemQ = 'container_memory_working_set_bytes'
        this.totalCpuQ = 'machine_cpu_cores'
        //this.nginxLatencyQ = (label, value) => {return `controller_upstream_server_response_latency_ms_count[15ms]{${label}=${value}}`}
        //this.nginxErrorRateQ = (label, value) => {return '100 - (nginx_http_requests_total[15m] / nginx_connections_accepted[5m]) * 100'}
        this.probeLatency = "sum(rate(probe_all_duration_seconds_sum[10m])) / sum(rate(probe_all_duration_seconds_count[10m]))"
        this.probeErrorRate = '100 - sum(rate(probe_success[10m]) * -100) by (env)'
        //this.probeSaturation = 
        this.probeReqPerSec = 'sum(probe_http_requests_count[1m]'
        this.endpoint = "http://localhost:9090"
        this.baseUrl = "/api/v1/"
        this.queryPath = 'query?query=';
 
        this.target = ""
        this.window = window;
        
        this.channelArr = ['cpu-usage', 'mem-usage', 'cpu-total', 'mem-total'];
        this.queryArr = [this.cpuQ, this.memQ, this.totalCpuQ, this.totalMemQ];
        this.probeChannelArr = ['latency', 'error-rate', 'req-per-sec'];
        this.probeQueryArr = [this.probeLatency, this.probeErrorRate, this.probeReqPerSec];
        this.hardwareQueries = this.hardwareQueries.bind(this);
        this.hardwareQueries(this.channelArr, this.queryArr);

        this.nwChannelArr = ['latency', 'err-rate', 'req-freq'];
        this.nwQueryArr = ['','',''];
        this.networkQueries = this.networkQueries.bind(this);
        this.networkQueries(this.nwChannelArr, this.nwQueryArr)

        this.customTypeArr = [];
        this.customQueryArr = [];
        this.getInput = this.getInput.bind(this);
        this.getInput();

        this.customQueries = this.customQueries.bind(this);
        this.customQueries(this.customTypeArr, this.customQueryArr);
        this.getNodesCPUUsage = this.getNodesCPUUsage.bind(this);
        this.getNodesCPUUsage();

        this.getNodesMemoryUsagePercent = this.getNodesMemoryUsagePercent.bind(this);
        this.getNodesMemoryUsagePercent();

        this.getPortNumber = this.getPortNumber.bind(this);
        this.getPortNumber();
    }

    getInput(){
        ipcMain.on('add:custom-query', (e, type, query) => {
            console.log('in get input', type, query)

            this.customTypeArr.push(type);
            this.customQueryArr.push(query);
        })
    }

    customQueries(type, query){
        console.log('in custom queries', type, query);
        ipcMain.on(`load:custom-queries`, async () => {
        const metrics = [];
        if (query.length > 0){
        for (let i=0; i < query.length; i++){
            try { 
                console.log('hello there', this.endpoint + this.baseUrl + `${type[i]}?query=` + query[i])
                const rawres = await fetch(this.endpoint + this.baseUrl + `${type[i]}?query=` + query[i]);
                const res = await rawres.json();
                console.log('hello again', res.data.result[0])
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

    getPortNumber() {
      ipcMain.on('get:prom-target', (e, data) => {
         this.target = `${data}`;
        });  
      return;  
    }

    networkQueries(probeChannelArr, probeQueryArr){
        for (let i=0; i < probeQueryArr.length; i++){
            ipcMain.on(`load:${probeChannelArr[i]}`, async () => {
            if (target.length === 0) return;
            try { 
                const rawres = await fetch(this.endpoint + this.baseUrl + `probe?target=${this.target}&module=http_2xx` + probeQueryArr[i]);
                const res = await rawres.json();
                console.log('network result:', res.data);
                const data = await res.data.result
                this.window.webContents.send(`get:${probeChannelArr[i]}`, data);
            }
            catch(err) {
                console.error('Error in Network Queries: ', err)
            }
        })
      }
    }

    hardwareQueries(channelArr, queryArr){
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

    getNodesCPUUsage() {
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
            
            }, 2000)
        })
    }
};

// ipcRenderer.on = similar to eventListener, listend to endpoint defined with .send
// ipcRenderer.send = similar to get req to ipcMain
// useEffect with dispatch

module.exports = PromClient;