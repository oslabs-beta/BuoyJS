import React, { useEffect } from 'react';
import { ipcRenderer } from 'electron';

const ClustersContainer = () => {

  console.log("testing console log")
  ipcRenderer.send("load:kube-objects")
  ipcRenderer.on('get:deployments', (e, deployments) => {
    console.log(deployments);
  });

  ipcRenderer.on('get:pods', (e, pods) => {
    console.log(pods);
  });

  ipcRenderer.on('get:services', (e, services) => {
    console.log(services);
  });

  ipcRenderer.on('get:apiResources', (e, apiResources) => {
    console.log(apiResources);
  });
  
  //window.electronAPI.setTitle(title);

  return (
    <div>Clusters Container
    </div>
  );
};

export default ClustersContainer;