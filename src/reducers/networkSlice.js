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
  },

});


export const selectCpuUsage = (state) => state.network.cpuUsage;
export const selectMemUsage = (state) => state.network.memUsage;
export const selectNetwork = (state) => state.network; 
export const { getCpuUsage, getMemUsage, getTotalCpu, getTotalMem, getLatency, getErrorRate, getReqPerSec } = networkSlice.actions;
export default networkSlice.reducer;
