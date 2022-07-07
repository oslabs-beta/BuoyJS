/**
 * ************************************
 *
 * @module loadPromClientData.js
 * @author team Buoy
 * @description Prometheus Client data??
 *
 * ************************************
 */

import { ipcRenderer, ipcMain } from "electron";
import { 
  getCpuUsage, 
  getErrorRate, 
  getLatency, 
  getMemUsage, 
  getReqPerSec, 
  getTotalCpu,
  getTotalMem, 
  setNodesPodsCpuUsage, 
  setNodeCpuColors, 
  setNodeCpuTimestamp, 
  setNodeCpuUsage, 
  setNodeMemoryColors, 
  setNodeMemoryMBUsage, 
  setNodeMemoryTimestamp, 
  setNodeMemoryUsage, 
  setNodesPodsCpuTimestamp,
  setNodesPodsCpuColors,
  setNodesPodsMemoryUsage,
  setNodesPodsMemoryTimestamp,
  setNodesPodsMemoryColors
} from "../reducers/networkSlice";
import { getCustomQueries } from "../reducers/inputSlice.js"

// timestamp function for all data retrieval
const getCurrentTimeUTC = () => {

  const currentTime = new Date().getTime();
  const seconds = Math.floor((currentTime / 1000) % 60);
  const minutes = Math.floor((currentTime / 1000 / 60) % 60);
  const hours = Math.floor((currentTime  / 1000 / 3600 ) % 24);
  const time = `${ hours > 9 ? hours : '0' + String(hours)}:${minutes > 9 ? minutes : '0' + String(minutes) }:${seconds > 9 ? seconds : '0' + String(seconds)} UTC`

  return time;
}

// exporting and dispatching prometheus client event listeners to respective channels 
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

    ipcRenderer.send('load:NodeMemoryUsageMB');
    ipcRenderer.on('get:NodeMemoryUsageMB', (e, data) => {
      dispatch(setNodeMemoryMBUsage(data));
    });

    ipcRenderer.send('load:NodesPodsCpuUsage');
    ipcRenderer.on('get:NodesPodsCpuUsage', (e, data) => {
      // get currentTime
      const time = getCurrentTimeUTC();
      dispatch(setNodesPodsCpuTimestamp(time));
      dispatch(setNodesPodsCpuUsage(data));
      dispatch(setNodesPodsCpuColors());
    });

    ipcRenderer.send('load:NodesPodsMemoryUsage');
    ipcRenderer.on('get:NodesPodsMemoryUsage', (e, data) => {
      const time = getCurrentTimeUTC();
      dispatch(setNodesPodsMemoryTimestamp(time));
      dispatch(setNodesPodsMemoryUsage(data));
      dispatch(setNodesPodsMemoryColors());
    });

    ipcRenderer.send('load:NodesPodsMemoryMBUsage');
};

// exporting and dispatching prometheus client event emitters to respective channels
export const promClientEmitters = () => {
  setInterval( () => {
  ipcRenderer.send('load:cpu-usage');
  ipcRenderer.send('load:mem-usage');
  ipcRenderer.send('load:cpu-total');
  ipcRenderer.send('load:mem-total');
  ipcRenderer.send('load:latency');
  ipcRenderer.send('load:error-rate');
  ipcRenderer.send('load:req-per-sec')
  //ipcRenderer.send('load:custom-queries');
  }, 15000);
}
