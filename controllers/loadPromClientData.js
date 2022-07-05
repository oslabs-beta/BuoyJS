import { ipcRenderer } from "electron";
import { getCpuUsage, getErrorRate, getLatency, getMemUsage, getReqPerSec, getTotalCpu, getTotalMem } from "../src/reducers/networkSlice";

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
      dispatch(getTotalMem(data));
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
    ipcRenderer.on('get:custom-metrics', (e, data) => {
      dispatch(getCustomMetrics(data));
    });
};

export const promClientEmitters = () => {
  ipcRenderer.send('load:cpu-usage');
  ipcRenderer.send('load:mem-usage');
  ipcRenderer.send('load:cpu-total');
  ipcRenderer.send('load:mem-total');
  ipcRenderer.send('load:latency');
  ipcRenderer.send('load:error-rate');
  ipcRenderer.send('load:req-per-sec')
  ipcRenderer.send('load:custom-metrics');
}
