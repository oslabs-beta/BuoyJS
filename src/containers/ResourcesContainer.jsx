/**
 * ************************************
 *
 * @module ResourcesContainer.jsx
 * @author team Buoy
 * @description React Component to render all components inside of Resources Page
 *
 * ************************************
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TotalCpuMemory from '../components/TotalCpuMemory.jsx';
import MemUsage from '../components/MemUsage.jsx';
import CpuUsage from '../components/CpuUsage.jsx';
import { selectInputs } from '../reducers/inputSlice.js';
import ClusterResourcesDisplay from '../components/ClusterResourcesDisplay.jsx';
import CustomQueryInput from '../components/CustomQueryInput.jsx';

import { getCpuUsage, selectCpuUsage, selectMemUsage, selectNetwork } from '../reducers/networkSlice.js';
import NodeChartsContainer from '../components/resources/NodeChartsContainer.jsx';

const ResourcesContainer = props => {
  
  // Gets metrics for memory and cpu as well as custom metrics for static display from state
  const cpuUsage = useSelector(selectCpuUsage);
  const memUsage = useSelector(selectMemUsage);
  const { totalMem, totalCpu } = useSelector(selectNetwork);
  const { queryLabel, customMetrics } = useSelector(selectInputs);

  /*
      <div className="ClusterResourcesContainer">
        <CustomQueryInput />
        { (queryLabel.length > 0) && <ClusterResourcesDisplay labels={queryLabel} metrics={customMetrics} /> }
      </div>
        <div className="CpuMemoryContainer">
        <TotalCpuMemory totalMem={totalMem} totalCpu={totalCpu}/>
        <MemUsage memUsage={memUsage} />
        <CpuUsage cpuUsage={cpuUsage} />
      </div>
  */

  return (
    <div className="ResourcesContainer">

      <NodeChartsContainer />
    </div>
  );
};

export default ResourcesContainer;