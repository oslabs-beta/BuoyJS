import { combineReducers } from "redux";

// import all reducers here
import reducer from "./reducer";
import clustersSlice from "./clustersSlice";


const reducers = ({
  clusters: clustersSlice,
  reducer: reducer,

});

export default reducers;