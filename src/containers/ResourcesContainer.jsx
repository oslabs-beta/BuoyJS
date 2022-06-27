import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TotalCpuMemory from '../components/TotalCpuMemory.jsx';
import MemUsage from '../components/MemUsage.jsx';
import CpuUsage from '../components/CpuUsage.jsx';
import ClusterResourcesDisplay from '../components/ClusterResourcesDisplay.jsx';
import { loadPromClientData } from '../../controllers/loadPromClientData.js';
import { ipcRenderer } from 'electron';
import { testQuery } from '../../promClient/promClient.js'
import { getCpuUsage, selectCpuUsage } from '../reducers/networkSlice.js';

// not sure if we'll be getting cpu/mem data via state or somewhere else ...
  // need to pass props into components whenever this is resolved.

const ResourcesContainer = props => {
  
  // const dispatch = useDispatch();
  //    ipcRenderer.send('load:apiResources');
  //    ipcRenderer.on('get:apiResources', (e, data) => {
  //      setApiResources(data);
  //    });

  let cpu;
  //useSelector(selectCpuUsage => cpu = selectCpuUsage.network.CpuUsage)

  return (
    <div className="ResourcesContainer">
      <div className="CpuMemoryContainer">
        <button id="TESTbutton" onClick={() => console.log(props)}></button>
        <TotalCpuMemory />
        <MemUsage />
        <CpuUsage />
      </div>
      <div className="ClusterResourcesContainer">
        <ClusterResourcesDisplay  />
      </div>
    </div>
  );
};

export default ResourcesContainer;