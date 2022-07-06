import { createSlice } from '@reduxjs/toolkit';

/**
 * Function to modularize the parsing of incoming resource data associated with Nodes. Each data point should have the format:
 * {
 *  name: value
 *  resourceUsage: value
 * }
 * @param {*} nodeUsageArr 
 * @param {*} data 
 * @returns 
 */
const getNodeResourceUsageArr = (nodeUsageArr, data) => {
  // if we have a blank slate, insert incoming data as part of state

  if (nodeUsageArr.length === 0) {
    const recvNodeUsage = data.map(node => {
      return { name: node.name, resourceUsage: [node.resourceUsage] }
    })
    return recvNodeUsage;
  } else {

    const newNodeResourceUsage = [];
    // limit resourceUsage dataset to 25 per node
    if (nodeUsageArr[0].resourceUsage.length < 25) {
      // for each node push new data
      for (let i = 0; i < nodeUsageArr.length; i++) {
        const payloadNode = data[i];
        newNodeResourceUsage.push({
          name: payloadNode.name,
          resourceUsage: [...nodeUsageArr[i].resourceUsage, payloadNode.resourceUsage ]
        })
      }
      
      return newNodeResourceUsage;
    // reached dataset Limit to 25 per node
    } else {
      // remove 1st element index & push new element in;
      for (let i = 0; i < nodeUsageArr.length; i++) {
        const payloadNode = data[i];
        const shiftedArray = nodeUsageArr[i].resourceUsage.slice(1);
        newNodeResourceUsage.push({
          name: payloadNode.name,
          resourceUsage: [...shiftedArray, payloadNode.resourceUsage]
        });
      }
      
      return newNodeResourceUsage;
    }
  }
}

const getNodeResourceTimestamp = (getNodeResourceTimestampArr, time) => {
  // timestamp result for our chart
  if (getNodeResourceTimestampArr.length < 25) {
    const newTimestampArr = [...getNodeResourceTimestampArr, time];
    return newTimestampArr;
  } else {
    const shiftedArray = getNodeResourceTimestampArr.slice(1);
    shiftedArray.push(time);
    return shiftedArray;
  }
}

/**
 * Functions to generate colors for each particular resources within our render graphs
 * 
 * @param {array} resourceArr 
 * @param {array} colorArr 
 * @returns {array} newColors - return colors to be added for graphs
 */
const getColorsArr = (resourceArr, colorArr) => {
    const resourceNum = resourceArr.length;
    const colorCount = colorArr.length;

    const newColors = [];
    // assign each node a random color
    if (colorCount < resourceNum) {

    let colorsToAdd = resourceNum - colorCount;
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
  return newColors;
}

export const networkSlice = createSlice({
  name: "network",

  initialState: {
    cpuUsage: 0,
    memUsage: 0,
    totalCpu: 0,
    totalMem: 0,

    latency: 0,
    errorRate: 0,
    reqPerSec: 0,

    nodeCpuUsage: [],
    nodeCpuTimestamp: [],
    nodeCpuColors: [],

    nodeMemoryUsage: [],
    nodeMemoryTimestamp: [],
    nodeMemoryColors: [],

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
      const newNodeCpuUsage = getNodeResourceUsageArr(current(state.nodeCpuUsage), action.payload);
      return { ...state, nodeCpuUsage: newNodeCpuUsage };
    },
    setNodeCpuTimestamp: (state, action) => {
      const newTimestampArr = getNodeResourceTimestamp(current(state.nodeCpuTimestamp), action.payload);
      return { ...state, nodeCpuTimestamp: newTimestampArr}
    },
    // set colors for the node CPU graphs
    setNodeCpuColors: (state, action) => {
      const newColors = getColorsArr(current(state.nodeCpuUsage), current(state.nodeCpuColors));
      return { ...state, nodeCpuColors: [...state.nodeCpuColors, ...newColors]};
    },

    setNodeMemoryUsage: (state, action) => {
      const newNodeMemoryUsage = getNodeResourceUsageArr(current(state.nodeMemoryUsage), action.payload);
      return { ...state, nodeMemoryUsage: newNodeMemoryUsage}
    },
    setNodeMemoryTimestamp: (state, action) => {
      const newTimestampArr = getNodeResourceTimestamp(current(state.nodeMemoryTimestamp), action.payload);
      return { ...state, nodeMemoryTimestamp: newTimestampArr}
    },
    setNodeMemoryColors: (state, action) => {
      const newColors = getColorsArr(current(state.nodeMemoryUsage), current(state.nodeMemoryColors));
      return { ...state, nodeMemoryColors: [...state.nodeMemoryColors, ...newColors]};
    },

  }
});

export const selectCpuUsage = (state) => state.network.cpuUsage;
export const selectMemUsage = (state) => state.network.memUsage;
export const selectNetwork = (state) => state.network;
export const selectNodeCpuUsage = (state) => state.network.nodeCpuUsage;
export const selectNodeCpuTimestamp = (state) => state.network.nodeCpuTimestamp;
export const selectNodeCpuColors = (state) => state.network.nodeCpuColors;
export const selectNodeMemoryUsage = (state) => state.network.nodeMemoryUsage;
export const selectNodeMemoryTimestamp = (state) => state.network.nodeMemoryTimestamp;
export const selectNodeMemoryColors = (state) => state.network.nodeMemoryColors;
export const { 
  getCpuUsage, 
  getMemUsage, 
  getTotalCpu, 
  getTotalMem,
  
  setNodeCpuUsage,
  setNodeCpuTimestamp,
  setNodeCpuColors,
  setNodeMemoryUsage,
  setNodeMemoryTimestamp,
  setNodeMemoryColors,
  
  getLatency,
  getErrorRate,
  getReqPerSec,
  setNodeCpuUsage

} = networkSlice.actions;
export default networkSlice.reducer;
