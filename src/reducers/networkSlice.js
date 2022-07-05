import { createSlice, current } from '@reduxjs/toolkit';
//const PromClient = require('.s/promClient/promClient.js')

export const networkSlice = createSlice({
  name: "network",

  initialState: {
    cpuUsage: 0,
    memUsage: 0,
    totalCpu: 0,
    totalMem: 0,
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
  },

});


export const selectCpuUsage = (state) => state.network.cpuUsage;
export const selectMemUsage = (state) => state.network.memUsage;
export const selectNetwork = (state) => state.network; 
export const { getCpuUsage, getMemUsage, getTotalCpu, getTotalMem } = networkSlice.actions;
export default networkSlice.reducer;
