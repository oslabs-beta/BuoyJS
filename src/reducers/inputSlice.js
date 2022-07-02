import { createSlice, current } from '@reduxjs/toolkit';
//const PromClient = require('.s/promClient/promClient.js')

export const inputSlice = createSlice({
  name: "input",

  initialState: {
    portNumber: 8080,
    query: "",
    queryType: "query",
    queryLabel: "",
  },

  reducers: {
    getPortNumber: (state, action) => {
      console.log('getPortNumber', action.payload)
      return Object.assign({}, state, {portNumber: action.payload});
    },
    getQuery: (state, action) => {
      return Object.assign({}, state, {query: action.payload});
    },
    getQueryType: (state, action) => {
      return Object.assign({}, state, {queryType: action.payload});
    },
    getQueryLabel: (state, action) => {
      return Object.assign({}, state, {queryLabel: action.payload});
    },
  },

});


export const selectInputs = (state) => state.input; 
export const { getPortNumber, getQuery, getQueryType, getQueryLabel } = inputSlice.actions;
export default inputSlice.reducer;
