const { ipcMain } = require('electron');
const { exec, spawn } = require('child_process');
const { Children } = require('react');


import { PrometheusDriver } from 'prometheus-query';

const prom = new PrometheusDriver({
    endpoint: "https://localhost:9090",
    baseUrl: "/api/v1"
})



module.exports = prom;