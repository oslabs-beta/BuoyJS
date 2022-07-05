import { ipcRenderer, ipcMain } from "electron";
import { useDispatch } from "react-redux";
import { getCpuUsage, getMemUsage, getTotalCpu, getTotalMem, setNodeCpuUsage } from "../src/reducers/networkSlice";

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
      dispatch(setNodeCpuUsage(data));
    });
};

export const promClientEmitters = () => {
  ipcRenderer.send('load:cpu-usage');
  ipcRenderer.send('load:mem-usage');
  ipcRenderer.send('load:cpu-total');
  ipcRenderer.send('load:mem-total');
  ipcRenderer.send('load:custom-metrics');
}
