import { createSlice, current } from '@reduxjs/toolkit';
import produce from 'immer';

export const clustersSlice = createSlice({

  name: "clusters",

  initialState: {
    nodes: {},
    namespaces: [
      {
        creationTime: undefined,
        name: null,
        status: undefined,
        deployments: [],
        pods: [],
        services: [],
      }
    ],
    deployments: [],
    pods: [],
    services: [],
    totalObjects: 0
  },

  reducers: {
    addNamespaces: (state, action) => {
      state.totalObjects += action.payload.length;

      action.payload.map( namespace =>
        // state.namespaces = [...state.namespaces, { ...namespace, deployment: [], pods: [], services: []}]
        state.namespaces.push({ ...namespace, deployments: [], pods: [], services: []})
      );
      console.log('in addNamespace: ', current(state.namespaces));
    },
    addDeployments: (state, action) => {
      state.totalObjects += action.payload.length;

      let nsIdx = 0;
      let deplIdx = 0;
      current(state.namespaces).map(namespace => {
        while (deplIdx < action.payload.length && action.payload[deplIdx].namespace === namespace.name) {
          state.namespaces[nsIdx].deployments.push(action.payload[deplIdx]);
          deplIdx++;
        }
        nsIdx++;
      });
      // add rest of deployments with no namespaces to namespace = null
      while(deplIdx < action.payload.length) {
        state.namespaces[0].deployments.push(action.payload[deplIdx]);
        deplIdx++;
      }
      console.log('in addDeployment', current(state.namespaces));
    },
    addPods: (state, action) => {
      state.totalObjects += action.payload.length;

      let nsIdx = 0;
      let podIdx = 0;
      current(state.namespaces).map(namespace => {
        while (podIdx < action.payload.length && action.payload[podIdx].namespace === namespace.name) {
          state.namespaces[nsIdx].pods.push(action.payload[podIdx]);
          podIdx++;
        }
        nsIdx++;
      });
      // add rest of pods with no namespaces to namespace = null
      while(podIdx < action.payload.length) {
        state.namespaces[0].pods.push(action.payload[podIdx]);
        podIdx++;
      } 
      console.log('in addPod', current(state.namespaces));
    },

    addNodes: (state, action) => {
      //Object.assign({}, state, { nodes: action.payload });

      for ( const key in action.payload ) {
        state.nodes[key] = action.payload[key];
      }
      console.log('in addNodes', current(state.nodes));
    },

    addServices: (state, action) => {
      state.totalObjects += action.payload.length;
      
      let nsIdx = 0;
      let serviceIdx = 0;
      current(state.namespaces).map(namespace => {
        while (serviceIdx < action.payload.length && action.payload[serviceIdx].namespace === namespace.name) {
          state.namespaces[nsIdx].services.push(action.payload[serviceIdx]);
          serviceIdx++;
        }
        nsIdx++;
      });
      // add rest of pods with no namespaces to namespace = null
      while(serviceIdx < action.payload.length) {
        state.namespaces[0].services.push(action.payload[serviceIdx]);
        serviceIdx++;
      }
      console.log('in addService', current(state.namespaces));
    },
  },
});

export const { 
  addNodes,
  addNamespaces,
  addDeployments,
  addPods,
  addServices
} = clustersSlice.actions;

export const selectKubeObjects = (state) => state.clusters;
export const selectNamespaces = (state) => state.clusters.namespaces;
export const selectNodes = (state) => state.clusters.nodes;

export default clustersSlice.reducer;