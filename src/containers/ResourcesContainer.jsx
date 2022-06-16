import React from 'react';
import { connect } from 'react-redux';
import TotalCpuMemory from '../components/TotalCpuMemory.jsx';
import MemUsage from '../components/MemUsage.jsx';
import CpuUsage from '../components/CpuUsage.jsx';
import ClusterResourcesDisplay from '../components/ClusterResourcesDisplay.jsx';

// not sure if we'll be getting cpu/mem data via state or somewhere else ...
  // need to pass props into components whenever this is resolved.

// const mapStateToProps = state => ({
//   totalCpu: ,
//   totalMemory: ,
//   memUsage: ,
//   cpuUsage: 
// })

const ResourcesContainer = props => {
  return (
    <div className="ResourcesContainer">
      <div className="CpuMemoryContainer">
        <TotalCpuMemory />
        <MemUsage />
        <CpuUsage />
      </div>
      <div className="ClusterResourcesContainer">
        <ClusterResourcesDisplay />
      </div>
    </div>
  );
};

// export default connect(mapStateToProps, null)(ResourcesContainer);   // --> uncomment if mapStateToProps used
export default ResourcesContainer;