/**
 * ************************************
 *
 * @module inputSlice.js
 * @author team Buoy
 * @description Reducer for all user input actions
 *
 * ************************************
 */

import { createSlice, current } from '@reduxjs/toolkit';

export const inputSlice = createSlice({
  name: "input",

  initialState: {
    portNumber: 8080,
    customMetrics: [],
    queryLabel: [],
  },

  reducers: {
    // saves user inputted target port in state
    getPortNumber: (state, action) => {
      return Object.assign({}, state, {
        portNumber: action.payload
      });
    },
    // saves user inputted query names in state
    getQueryLabel: (state, action) => {
      return Object.assign({}, state, {
        queryLabel: [...state.queryLabel, action.payload]
      });
    },
    // user's custom metrics response information to store in state
    getCustomQueries: (state, action) => {
      return Object.assign({}, state, {
        customMetrics : [...action.payload]
      });
    }
  },
});

// export input slice reducers as actions
export const { getPortNumber, getCustomQueries, getQueryLabel } = inputSlice.actions;

// export each piece of state for user inputs
export const selectInputs = (state) => state.input; 

export default inputSlice.reducer;
