import { createSlice } from '@reduxjs/toolkit';

export const networkSlice = createSlice({
  name: "network",

  initialState: {
    cpuUsage: 0,
    memUsage: 0,
    totalCpu: 0,
    totalMem: 0,
    latency: 0,
    errorRate: 0,
    reqPerSec: 0
    nodeCpuUsage: [],
  },

  reducers: {
    getCpuUsage: (state, action) => {
      return Object.assign({}, state, {cpuUsage: action.payload});
    },
    getMemUsage: (state, action) => {
      return Object.assign({}, state, {memUsage: action.payload});
    },
    getTotalCpu: (state, action) => {
      return Object.assign({}, state, {totalCpu: action.payload});
    },
    getTotalMem: (state, action) => {
      return Object.assign({}, state, {totalMem: action.payload});
    },
    getLatency: (state, action) => {
      return Object.assign({}, state, {latency: action.payload});
    },
    getErrorRate: (state, action) => {
      return Object.assign({}, state, {errorRate: action.payload});
    },
    getReqPerSec: (state, action) => {
      return Object.assign({}, state, {reqPerSec: action.payload});
    },
    setNodeCpuUsage: (state, action) => {
      // if we have a blank slate, insert incoming data as part of state
      if (state.nodeCpuUsage.length === 0) {
        const recvNodeCpuUsage = action.payload.map(node => {
          return { nodeName: node.nodeName, cpuUsage: [node.cpuUsage] }
        })
        return {...state, nodeCpuUsage: recvNodeCpuUsage};
      } else {
        state.nodeCpuUsage.map(node => {
          console.log(`nodeName: ${node.nodeName} cpuUsage: ${node.cpuUsage[0]}`)
        })
      }
    }
  },

});


export const selectCpuUsage = (state) => state.network.cpuUsage;
export const selectMemUsage = (state) => state.network.memUsage;
export const selectNetwork = (state) => state.network;
export const selectNodeCpuUsage = (state) => state.nodeCpuUsage;
export const { 
  getCpuUsage, 
  getMemUsage, 
  getTotalCpu, 
  getTotalMem,
  setNodeCpuUsage
} = networkSlice.actions;
export default networkSlice.reducer;
