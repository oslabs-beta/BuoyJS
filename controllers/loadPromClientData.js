import { ipcRenderer, ipcMain } from "electron";
import { useDispatch } from "react-redux";
import { getCpuUsage, getMemUsage, getTotalCpu, getTotalMem } from "../src/reducers/networkSlice";

export const loadPromClientData = (dispatch) => {
    console.log('in loadPromClientData');
    ipcRenderer.send('load:cpu-usage');
    ipcRenderer.on('get:cpu-usage', (e, data) => {
      console.log(data);
    });
}

/*
export const loadPromClientData = (dispatch) => {
  if (dispatch.type = 'get:cpu-usage'){
    console.log('', dispatch)
    ipcRenderer.send('load:cpu-usage');
  }
  const temp = ipcRenderer.on('load:cpu-usage', (e, data)=>{
      console.log('in loadpromclient for some reason')
      dispatch(getCpuUsage(data));
  })

  ipcRenderer.send('load:mem-usage');
  ipcRenderer.on('load:mem-Usage', (e, data) => console.log('lmao'))
  const temp2 = ipcRenderer.on('get:mem-usage', (e, data) => {
    dispatch(getMemUsage(data));
  });

  ipcRenderer.send('load:total-cpu');
  const temp3 = ipcRenderer.on('get:total-cpu', (e, data) => {
    dispatch((getTotalCpu(data)));
  });

  ipcRenderer.send('load:total-mem');
  const temp4 = ipcRenderer.on('get:total-mem', (e, data) => {
    dispatch((getTotalMem(data)));
  });

};

// let ms = 1000;
// const resArr = [];

// const timeout = ms => {
//   return new Promise(resolve => setTimeout(resolve, ms));
// };

// const apiCall = async () => {
//   for (let i = 0; i < 10; i++) {
//     console.log('hi');
//     await timeout(ms);
//   }
// }

// apiCall();
*/