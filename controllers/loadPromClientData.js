import { ipcRenderer } from "electron";
import { getCpuUsage, getErrorRate, getLatency, getMemUsage, getReqPerSec, getTotalCpu, getTotalMem, setNodeCpuUsage } from "../src/reducers/networkSlice";
import { getCustomQueries } from "../src/reducers/inputSlice.js"

export const promClientListeners = (dispatch) => {
    ipcRenderer.on('get:cpu-usage', (e, data) => {
      dispatch(getCpuUsage(data));
    });
    ipcRenderer.on('get:mem-usage', (e, data) => {
      dispatch(getMemUsage(data));
    });
    ipcRenderer.on('get:cpu-total', (e, data) => {
      dispatch(getTotalCpu(data));
    });
    ipcRenderer.on('get:mem-total', (e, data) => {
      dispatch(getTotalMem(`${data / (1024 * 1024)} MB`));
    });
    ipcRenderer.on('get:custom-queries', (e, data) => {
      dispatch(getCustomQueries(data))
    });
    ipcRenderer.on('get:latency', (e, data) => {
      dispatch(getLatency(data));
    });
    ipcRenderer.on('get:error-rate', (e, data) => {
      dispatch(getErrorRate(data));
    });
    ipcRenderer.on('get:req-per-sec', (e, data) => {
      dispatch(getReqPerSec(data));
    });
    // getNodeCPU information
    ipcRenderer.on('get:NodeCPUUsage', (e, data) => { 
      dispatch(setNodeCpuUsage(data));
    });
};

export const promClientEmitters = () => {
  setInterval( () => {
  ipcRenderer.send('load:cpu-usage');
  ipcRenderer.send('load:mem-usage');
  ipcRenderer.send('load:cpu-total');
  ipcRenderer.send('load:mem-total');
  ipcRenderer.send('load:latency');
  ipcRenderer.send('load:error-rate');
  ipcRenderer.send('load:req-per-sec')
  ipcRenderer.send('load:custom-queries');
  ipcRenderer.send('load:NodeCPUUsage');
  }, 15000);
}
