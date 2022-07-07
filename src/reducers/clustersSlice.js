/**
 * ************************************
 *
 * @module clustersSlice.js
 * @author team Buoy
 * @description Reducer for all Clusters actions
 *
 * ************************************
 */

import { createSlice, current } from '@reduxjs/toolkit';

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

    // slice action for adding all active namespaces to state
    addNamespaces: (state, action) => {
      state.totalObjects += action.payload.length;

      action.payload.map( namespace =>
        // state.namespaces = [...state.namespaces, { ...namespace, deployment: [], pods: [], services: []}]
        state.namespaces.push({ ...namespace, deployments: [], pods: [], services: []})
      );
    },

    // slice action for adding all active deployments to state
    addDeployments: (state, action) => {
      state.totalObjects += action.payload.length;

      let nsIdx = 0;
      let deplIdx = 0;
      current(state.namespaces).map(namespace => {
        // adds deployments with namespaces to state
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
    },

    // slice action for adding all active pods to state
    addPods: (state, action) => {
      state.totalObjects += action.payload.length;

      let nsIdx = 0;
      let podIdx = 0;
      current(state.namespaces).map(namespace => {
        // adds pods with namespaces to state
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

    },

    // slice action for adding all active nodes to state
    addNodes: (state, action) => {

      for ( const key in action.payload ) {
        state.nodes[key] = action.payload[key];
      }
    },

    // slice action for adding all active services to state 
    addServices: (state, action) => {
      state.totalObjects += action.payload.length;
      
      let nsIdx = 0;
      let serviceIdx = 0;
      current(state.namespaces).map(namespace => {
        // adds services with namespaces to state
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
    },
  },
});


// export cluster slice reducers as actions
export const { 
  addNodes,
  addNamespaces,
  addDeployments,
  addPods,
  addServices
} = clustersSlice.actions;

// export each piece of state for clusters
export const selectKubeObjects = (state) => state.clusters;
export const selectNamespaces = (state) => state.clusters.namespaces;
export const selectNodes = (state) => state.clusters.nodes;

export default clustersSlice.reducer;