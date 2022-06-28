
const { ipcMain } = require('electron');
const fetch = require('node-fetch');



// const prom = new PrometheusDriver({
//     endpoint: "https://localhost:9090",
//     baseUrl: "/api/v1"
// })
// let query = 'sum(rate(container_cpu_usage_seconds_total{node="monitoring-worker", id="/"}[10m])) by (node)'

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
        this.nginxLatencyQ = (label, value) => {return `controller_upstream_server_response_latency_ms_count[15ms]{${label}=${value}}`}
        this.nginxErrorRateQ = (label, value) => {return '100 - (nginx_http_requests_total[15m] / nginx_connections_accepted[5m]) * 100'}
        this.customQueries = {}
        this.endpoint = "http://localhost:9090"
        this.baseUrl = "/api/v1/"

        this.window = window;
        
        this.cpuUseQuery = this.cpuUseQuery.bind(this);
        this.memUseQuery = this.memUseQuery.bind(this);
        this.totalCpuQuery = this.totalCpuQuery.bind(this);
        this.totalMemQuery = this.memUseQuery.bind(this);
        this.cpuUseQuery();
        this.memUseQuery();
        this.totalCpuQuery();
        this.totalMemQuery();
    }

    // async query(query, qtype = 'query'){
    //     const rawRes = await fetch(prom.endpoint + prom.baseUrl + qtype + '?query=' + query);
    //     const res = await rawRes.json()
    // if (res.status === success) {
    //     return res.data.value[1]
    // }
    // }
    // createQuery(name, string, qtype){
    //     this.customQueries[name] = [string, qtype]
    // }

    cpuUseQuery(){
        ipcMain.on('load:cpu-usage', async () => {
            try {
                // const rawres = await fetch('http://localhost:9090/api/v1/query?query=100-(avg%20by%20(node)%20(rate(container_cpu_usage_seconds_total%7Bnode=%22monitoring-control-plane%22%7D[1m]))%20*%20100)'); // for guohong
                // const rawres = await fetch('http://localhost:9090/api/v1/query?query=100-(avg%20by%20(node)%20(rate(container_cpu_usage_seconds_total%7Bnode=%22docker-desktop%22%7D[15m]))%20*%20100)'); // <- for jonah
                // const rawres = await fetch('https://localhost:9090/api/v1/query?query=100-(avg%20by%20(node)%20(rate(container_cpu_usage_seconds_total[15m]))%20*%20100))); // <- using 'this' keywords
                const rawres = await fetch(this.endpoint + this.baseUrl + 'query?query=' +  this.cpuQ)
                const res = await rawres.json();
                const cpuUsage = await res.data.result[0]//.value[1];
                this.window.webContents.send('get:cpu-usage', cpuUsage);
            }
            catch(err) {
            console.log('ERROR in promClient cpuUseQuery', err)
            }
        });
    }
    memUseQuery(){
        ipcMain.on('load:mem-usage', async () => {
            try { 
                const rawres = await fetch(this.endpoint + this.baseUrl + 'query?query=' + this.memQ);
                const res = await rawres.json();
                const memUsage = await res.data.result[0].value[1];
                this.window.webContents.send('get:mem-usage', memUsage);
            }
            catch(err) {
                console.error('Error in PromClient memQuery', err)
            }
        })
    }
    totalCpuQuery(){
        ipcMain.on('load:cpu-total', async () => {
            try { 
                const rawres = await fetch(this.endpoint + this.baseUrl + 'query?query=' + this.totalCpuQ);
                const res = await rawres.json();
                const cpuTotal = await res.data.result[0].value[1];
                this.window.webContents.send('get:cpu-total', cpuTotal);
            }
            catch(err) {
                console.error('Error in PromClient-totalCpu', err)
            }
        })
    }
    totalMemQuery(){
        ipcMain.on('load:mem-total', async () => {
            try { 
                const rawres = await fetch(this.endpoint + this.baseUrl + 'query?query=' + this.totalMemQuery);
                const res = await rawres.json();
                console.log('memTotal:', res.result);
                const memTotal = await res.data.result[0].value[1];
                this.window.webContents.send('get:mem-total', memTotal);
            }
            catch(err) {
                console.error('Error in PromClient-totalMem', err)
            }
        })    }
}

//const test = new PromClient();


// ipcRenderer.on = similar to eventListener, listend to endpoint defined with .send
// ipcRenderer.send = similar to get req to ipcMain
// useEffect with dispatch

// sum(rate(container_cpu_usage_seconds_total
// {node="monitoring-worker", id="/"}[10m])) by (node)
module.exports = PromClient;