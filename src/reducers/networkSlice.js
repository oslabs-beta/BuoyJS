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
    nodeCpuTimestamp: [],
    nodeCpuColors: [],

    nodeMemoryUsage: [],
    nodeMemoryTimestamp: [],
    ndoeMemoryColors: [],

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
    },
    setNodeCpuTimestamp: (state, action) => {
      // timestamp result for our chart
      if (state.nodeCpuTimestamp.length < 25) {
        const newTimestampArr = [...state.nodeCpuTimestamp, action.payload];
        return { ...state, nodeCpuTimestamp: newTimestampArr}
      } else {
        const shiftedArray = current(state.nodeCpuTimestamp).slice(1);
        shiftedArray.push(action.payload);
        return { ...state, nodeCpuTimestamp: shiftedArray}
      }
    },
    // set colors for the node CPU graphs
    setNodeCpuColors: (state, action) => {
      const nodeNum = state.nodeCpuUsage.length;
      const colorCount = state.nodeCpuColors.length;

      const newColors = [];
      // assign each node a random color
      if (colorCount < nodeNum) {

        let colorsToAdd = nodeNum - colorCount;
        while(colorsToAdd > 0) {
          const r = Math.floor(Math.random() * 255);
          const g = Math.floor(Math.random() * 255);
          const b = Math.floor(Math.random() * 255);

          newColors.push({
            borderColor: `rgb(${r}, ${g}, ${b})`,
            backgroundColor: `rgba(${r}, ${g}, ${b}, 0.5)`
          });
          colorsToAdd--;
        }
      }
      return { ...state, nodeCpuColors: [...state.nodeCpuColors, ...newColors]};
    },
  }
});

export const selectCpuUsage = (state) => state.network.cpuUsage;
export const selectMemUsage = (state) => state.network.memUsage;
export const selectNetwork = (state) => state.network;
export const selectNodeCpuUsage = (state) => state.network.nodeCpuUsage;
export const selectNodeCpuTimestamp = (state) => state.network.nodeCpuTimestamp;
export const selectNodeCpuColors = (state) => state.network.nodeCpuColors;
export const { 
  getCpuUsage, 
  getMemUsage, 
  getTotalCpu, 
  getTotalMem,
  setNodeCpuUsage,
  setNodeCpuTimestamp,
  setNodeCpuColors,
} = networkSlice.actions;
export default networkSlice.reducer;
