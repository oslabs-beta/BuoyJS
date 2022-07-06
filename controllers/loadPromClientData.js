import { ipcRenderer, ipcMain } from "electron";
import { useDispatch } from "react-redux";
import { getCpuUsage, getMemUsage, getTotalCpu, getTotalMem, setNodeCpuColors, setNodeCpuTimestamp, setNodeCpuUsage, setNodeMemoryColors, setNodeMemoryTimestamp, setNodeMemoryUsage } from "../src/reducers/networkSlice";

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
    ipcRenderer.on('get:mem-total', (e, data) => {
      dispatch(getTotalMem(data));
    });
    ipcRenderer.on('get:custom-metrics', (e, data) => {
      dispatch(getCustomMetrics(data));
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
  ipcRenderer.send('load:cpu-usage');
  ipcRenderer.send('load:mem-usage');
  ipcRenderer.send('load:cpu-total');
  ipcRenderer.send('load:mem-total');
  ipcRenderer.send('load:custom-metrics');
}
