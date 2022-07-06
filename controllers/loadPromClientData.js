import { ipcRenderer, ipcMain } from "electron";
import { getCpuUsage, getErrorRate, getLatency, getMemUsage, getReqPerSec, getTotalCpu, getTotalMem, setNodeCpuColors, setNodeCpuTimestamp, setNodeCpuUsage, setNodeMemoryColors, setNodeMemoryTimestamp, setNodeMemoryUsage } from "../src/reducers/networkSlice";
import { getCustomQueries } from "../src/reducers/inputSlice.js"

// timestamp function for all data retrieval
const getCurrentTimeUTC = () => {

  const currentTime = new Date().getTime();
  const seconds = Math.floor((currentTime / 1000) % 60);
  const minutes = Math.floor((currentTime / 1000 / 60) % 60);
  const hours = Math.floor((currentTime  / 1000 / 3600 ) % 24);
  const time = `${ hours > 9 ? hours : '0' + String(hours)}:${minutes > 9 ? minutes : '0' + String(minutes) }:${seconds > 9 ? seconds : '0' + String(seconds)} UTC`

  return time;
}

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

		ipcRenderer.send('load:NodeCPUUsage');
    ipcRenderer.on('get:NodeCPUUsage', (e, data) => {

      // get currentTime
      const time = getCurrentTimeUTC();

      dispatch(setNodeCpuTimestamp(time));
      dispatch(setNodeCpuUsage(data));
      dispatch(setNodeCpuColors());
    });

     // getNodeMemory information
		ipcRenderer.send('load:NodeMemoryUsagePercent');
    ipcRenderer.on('get:NodeMemoryUsagePercent', (e, data) => {

      // get currentTime
      const time = getCurrentTimeUTC();

      dispatch(setNodeMemoryTimestamp(time));
      dispatch(setNodeMemoryUsage(data));
      dispatch(setNodeMemoryColors());
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
