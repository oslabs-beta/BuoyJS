/**
 * ************************************
 *
 * @module combineReducers.js
 * @author team Buoy
 * @description Combines all reducers for the store
 *
 * ************************************
 */

import { combineReducers } from "redux";

// import all reducers here
import clustersSlice from "./clustersSlice";
import networkSlice from "./networkSlice";
import inputSlice from "./inputSlice";

const reducers = ({
  clusters: clustersSlice,
  network: networkSlice,
  input: inputSlice
});

export default reducers;