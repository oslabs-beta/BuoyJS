/**
 * ************************************
 *
 * @module loadKubeClientData.js
 * @author team Buoy
 * @description Kubernetes Client data??
 *
 * ************************************
 */

import { ipcRenderer } from "electron";
import { addNodes, addNamespaces, addDeployments, addPods, addServices} from '../reducers/clustersSlice';


// sending Kubernetes client data to their respective channels
export const loadKubeClientData = (dispatch) => {

  ipcRenderer.send('load:namespaces');
  const namespaceEvtTgt = ipcRenderer.on('get:namespaces', (e, data) => {
    dispatch(addNamespaces(data));
  });

  ipcRenderer.send('load:deployments');
  const deploymentEvtTgt = ipcRenderer.on('get:deployments', (e, data) => {
    dispatch(addDeployments(data));
  });

  ipcRenderer.send('load:pods');
  const podEvtTgt = ipcRenderer.on('get:pods', (e, data) => {
    dispatch(addPods(data));
  });

  ipcRenderer.send('load:nodes')
  const nodeEvtTgt = ipcRenderer.on('get:nodes', (e, data) => {
    dispatch(addNodes(data));
  });

  ipcRenderer.send('load:services');
  const serviceEvtTgt = ipcRenderer.on('get:services', (e, data) => {
    dispatch(addServices(data));
  });

  /*
  return () => {
    ipcRenderer.removeAllListeners('get:namespaces');
    ipcRenderer.removeAllListeners('get:deployments');
    ipcRenderer.removeAllListeners('get:pods');
    ipcRenderer.removeAllListeners('get:services');
  };
  */
}