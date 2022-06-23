const { ipcMain } = require('electron');
const { exec, spawn } = require('child_process');
const { Children } = require('react');


//import { PrometheusDriver } from 'prometheus-query';

// const prom = new PrometheusDriver({
//     endpoint: "https://localhost:9090",
//     baseUrl: "/api/v1"
// })
// let query = 'sum(rate(container_cpu_usage_seconds_total{node="monitoring-worker", id="/"}[10m])) by (node)'

class PromQ{
    constructor(){
    this.cpuQ = (label, value) => {return `100 - (avg by (node) (rate(container_cpu_usage_seconds_total[1m]){${label}=${value}}) * 100)`}
    this.memQ = (label, value) => {return `sum(container_memory_working_set_bytes{${label}="${value}"} / container_memory_usage_bytes{${label}="${value}})`}
    this.customQueries = {}
    this.endpoint = "https://localhost:9090"
    this.baseUrl = "/api/v1"
}
    async query(query, qtype = 'query'){
        const rawRes = await fetch(prom.endpoint + prom.baseUrl + qtype + '?query=' + query);
        const res = await rawRes.json()
    if (res.status === success){
        return res.data.value[1]
    }
    }

    createQuery(name, string, qtype){
        this.customQueries[name] = [string, qtype]
    }
}


// sum(rate(container_cpu_usage_seconds_total
// {node="monitoring-worker", id="/"}[10m])) by (node)
module.exports = PromQ;