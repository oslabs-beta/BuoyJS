
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
        this.customQueries = {}
        this.endpoint = "http://localhost:9090"
        this.baseUrl = "/api/v1/"
        this.target = ""
        this.window = window;
        
        this.channelArr = ['cpu-usage', 'mem-usage', 'cpu-total', 'mem-total'];
        this.queryArr = [this.cpuQ, this.memQ, this.totalCpuQ, this.totalMemQ];
        this.probeChannelArr = ['latency', 'error-rate', 'req-per-sec'];
        this.probeQueryArr = [this.probeLatency, this.probeErrorRate, this.probeReqPerSec];
        this.hardwareQueries = this.hardwareQueries.bind(this);
        this.hardwareQueries(this.channelArr, this.queryArr);

        this.nwChannelArr = [];
        this.nwQueryArr = [];
        this.networkQueries = this.networkQueries.bind(this);
        this.networkQueries(this.nwChannelArr, this.nwQueryArr)
    }
    networkQueries(probeChannelArr, probeQueryArr){
        for (let i=0; i < probeQueryArr.length; i++){
            ipcMain.on(`load:${probeChannelArr[i]}`, async () => {
            try { 
                const rawres = await fetch(this.endpoint + this.baseUrl + `probe?target=${this.target}&module=http_2xx` + probeQueryArr[i]);
                const res = await rawres.json();
                console.log('network result:', res.data);
                const data = await res.data.result
                this.window.webContents.send(`get:${probeChannelArr[i]}`, data);
            }
            catch(err) {
                console.error('Error in Network Queries', err)
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
};

// ipcRenderer.on = similar to eventListener, listend to endpoint defined with .send
// ipcRenderer.send = similar to get req to ipcMain
// useEffect with dispatch

module.exports = PromClient;