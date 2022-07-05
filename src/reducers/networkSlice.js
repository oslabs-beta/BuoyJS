import { createSlice, current } from '@reduxjs/toolkit';
//const PromClient = require('.s/promClient/promClient.js')

export const networkSlice = createSlice({
  name: "network",

  initialState: {
    cpuUsage: 0,
    memUsage: 0,
    totalCpu: 0,
    totalMem: 0,
    nodeCpuUsage: [],
  },

  reducers: {
    getCpuUsage: (state, action) => {
      console.log('getCpuUsage', action.payload)
      return Object.assign({}, state, {cpuUsage: action.payload});
    },
    getMemUsage: (state, action) => {
      console.log('get Mem Usage',action.payload)
      return Object.assign({}, state, {memUsage: action.payload});
    },
    getTotalCpu: (state, action) => {
      console.log(action.payload)
      return Object.assign({}, state, {totalCpu: action.payload});
    },
    getTotalMem: (state, action) => {
      console.log(action.payload)
      return Object.assign({}, state, {totalMem: action.payload});
    },
    setNodeCpuUsage: (state, action) => {
      // if we have a blank slate, insert incoming data as part of state
      if (state.nodeCpuUsage.length === 0) {
        const recvNodeCpuUsage = action.payload.map(node => {
          return { nodeName: node.nodeName, cpuUsage: [node.cpuUsage] }
        })
        return {...state, nodeCpuUsage: recvNodeCpuUsage};
      } else {

        const nodeCpuUsage = current(state.nodeCpuUsage);

        const newNodeCpuUsage = [];

        // limit cpuUsage dataset to 25 per node
        if (nodeCpuUsage[0].cpuUsage.length < 25) {
          // for each node push new data
          for (let i = 0; i < nodeCpuUsage.length; i++) {
            const payloadNode = action.payload[i];
            newNodeCpuUsage.push({
              nodeName: payloadNode.nodeName,
              cpuUsage: [...nodeCpuUsage[i].cpuUsage, payloadNode.cpuUsage ]
            })
          }
          
          return { ...state, nodeCpuUsage: newNodeCpuUsage};
        // reached dataset Limit to 25 per node
        } else {
          // remove 1st element index & push new element in;
          for (let i = 0; i < nodeCpuUsage.length; i++) {
            const payloadNode = action.payload[i];
            const shiftedArray = nodeCpuUsage[i].cpuUsage.slice(1);
            newNodeCpuUsage.push({
              nodeName: payloadNode.nodeName,
              cpuUsage: [...shiftedArray, payloadNode.cpuUsage]
            });
          }

          return { ...state, nodeCpuUsage: newNodeCpuUsage};
        }
      }
    }
  },
});

export const selectCpuUsage = (state) => state.network.cpuUsage;
export const selectMemUsage = (state) => state.network.memUsage;
export const selectNetwork = (state) => state.network;
export const selectNodeCpuUsage = (state) => state.network.nodeCpuUsage;
export const { 
  getCpuUsage, 
  getMemUsage, 
  getTotalCpu, 
  getTotalMem,
  setNodeCpuUsage
} = networkSlice.actions;
export default networkSlice.reducer;
