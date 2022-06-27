import { combineReducers } from "redux";

// import all reducers here
import reducer from "./reducer";
import clustersSlice from "./clustersSlice";
import networkSlice from "./networkSlice";


const reducers = ({
  clusters: clustersSlice,
  network: networkSlice,
});

export default reducers;