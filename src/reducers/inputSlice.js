import { createSlice, current } from '@reduxjs/toolkit';
//const PromClient = require('.s/promClient/promClient.js')

export const inputSlice = createSlice({
  name: "input",

  initialState: {
    portNumber: 8080,
    customMetrics: [],
    //queryType: [],
    queryLabel: [],
  },

  reducers: {
    getPortNumber: (state, action) => {
      return Object.assign({}, state, {portNumber: action.payload});
    },
    getQueryLabel: (state, action) => {
      return Object.assign({}, state, {
        //query : [...state.query, action.payload.queryInput],
        //queryType: [...state.queryType, action.payload.queryType],
        queryLabel: [...state.queryLabel, action.payload]
      });
    },
    getCustomQueries: (state, action) => {
      return Object.assign({}, state, {
        //queryType : [...action.payload.queryType],
        customMetrics : [...action.payload.customMetrics]
      })
    }
  },

});


export const selectInputs = (state) => state.input; 
export const { getPortNumber, getCustomQueries, getQueryType, getQueryLabel } = inputSlice.actions;
export default inputSlice.reducer;
