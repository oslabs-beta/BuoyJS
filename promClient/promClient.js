
const { ipcMain } = require('electron');
const fetch = require('node-fetch');


//import { PrometheusDriver } from 'prometheus-query';

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
        /*
        this.cpuQ = (label, value) => {return `100 - (avg by (node) (rate(container_cpu_usage_seconds_total{${label}=${value}}[1m])) * 100)`}
        this.memQ = (label, value) => {return `sum(container_memory_working_set_bytes{${label}="${value}"} / container_memory_usage_bytes{${label}="${value}})`}
        //this.nginxLatencyQ = (label, value) => {return `controller_upstream_server_response_latency_ms_count[15ms]{${label}=${value}}`}
        this.customQueries = {}
        this.endpoint = "https://localhost:9090"
        this.baseUrl = "/api/v1"
        */

        this.window = window;
        
        this.testQuery = this.testQuery.bind(this);

        this.testQuery();
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

    testQuery(){
        
        ipcMain.on('load:cpu-usage', async () => {
            try {
                console.log("in prom client lol")
                const rawres = await fetch('http://localhost:9090/api/v1/query?query=100-(avg%20by%20(node)%20(rate(container_cpu_usage_seconds_total%7Bnode=%22monitoring-control-plane%22%7D[1m]))%20*%20100)');
                console.log(rawres, 'rawres in testQuery');
                const res = await rawres.json();
                console.log(res, 'res in testQuery');
                const CpuUsage = await res.data.result[0].value[1];
                console.log(CpuUsage);
                this.window.webContents.send('get:cpu-usage', `promClient-testQuery: ${CpuUsage}`);
            }

            catch(err) {
            console.log('ERROR in promClient', err)
            }

            
        });
    }
}

//const test = new PromClient();


// ipcRenderer.on = similar to eventListener, listend to endpoint defined with .send
// ipcRenderer.send = similar to get req to ipcMain
// useEffect with dispatch

// sum(rate(container_cpu_usage_seconds_total
// {node="monitoring-worker", id="/"}[10m])) by (node)
module.exports = PromClient;