import { createSlice, current } from '@reduxjs/toolkit';
//const PromClient = require('.s/promClient/promClient.js')

export const networkSlice = createSlice({
  name: "network",

  initialState: {
    CpuUsage: {
      
    },
    MemUsage: {
      
    },
    TotalCpu: {

    },
    TotalMem: {

    },
  },

  reducers: {
    getCpuUsage: (state, action) => {
      console.log(action, 'action in getCpuUsage');
      //const res = PromClient.testQuery()
      Object.assign({}, state, {CpuUsage: action.payload});
    },
    getMemUsage: (state, action) => {
      console.log(action, 'action in getMemUsage');
      Object.assign({}, state, {MemUsage: action.payload});
    },
    getTotalCpu: (state, action) => {
      console.log(action, 'action in getTotalCpu');
      Object.assign({}, state, {TotalCpu: action.payload});
    },
    getTotalMem: (state, action) => {
      console.log(action, 'action in getTotalMem');
      Object.assign({}, state, {TotalMem: action.payload});
    },
  },

});


export const selectCpuUsage = (state) => state.network.CpuUsage;
export const { getCpuUsage, getMemUsage, getTotalCpu, getTotalMem } = networkSlice.actions;
export default networkSlice.reducer;
