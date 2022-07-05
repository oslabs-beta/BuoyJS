import React from 'react';
import Nodes from '../components/cluster_objects/Nodes.jsx'
import Namespaces from '../components/cluster_objects/Namespaces.jsx';
import ApiResources from '../components/cluster_objects/ApiResources.jsx';


// import { ipcRenderer } from 'electron';

const ClustersDetailsContainer = () => {
  return (
    <div className="clusterDetailsContainer">
      {/* <div className="ApdexHeaderBox"> */}
        {/* <h1>Apdex Score</h1> */}
      {/* </div> */}
      <div className="ClustersContainer1">
        <div className="ClusterObjectsContainer">
          <Nodes />
          <Namespaces />
        </div>
      </div>
      <ApiResources />
    </div>
  );
}

export default ClustersDetailsContainer;