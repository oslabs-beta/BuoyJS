import { createSlice } from '@reduxjs/toolkit';

export const clustersSlice = createSlice({

  name: "clusters",

  initialState: {
    namespaces: [],
    deployments: [],
    pods: [],
    services: [],
  },

  reducers: {
    addNamespace: (state, action) => {
      action.payload.map( namespace =>
        state.namespaces = [...state.namespaces, { ...namespace, deployment: [], pods: [], services: []}]
      );
      console.log('in addNamespace: ', state.namespaces);
    },
    addDeployment: (state, action) => {
      console.log('in addDeployment');
    },
    addPod: (state, action) => {
      console.log('in addPod');
    },
    addService: (state, action) => {
      console.log('in addService');
    },
  },


});

export const { 
  addNamespace,
  addDeployment,
  addPod,
  addService
} = clustersSlice.actions;

export const selectKubeObjects = (state) => state.clusters;
export const selectNamespaces = (state) => state.clusters.namespaces;

export default clustersSlice.reducer;


/*

const initialState = {
  
};


const clustersReducer = (state = initialState, action) => {
  
  const { type, payload } = action;

  switch(type) {
    case ADD_NAMESPACE :
      break;
    case ADD_DEPLOYMENT:
      break;
    case ADD_POD:
      break;
    case ADD_SERVICE:
      break;

    default: {
      return state;
    }
  }

};

export default clustersReducer;
*/