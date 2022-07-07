/**
 * ************************************
 *
 * @module ClustersDetailsContainer.jsx
 * @author team Buoy
 * @description React Component for rendering top of Clusters Page Info
 *
 * ************************************
 */

import React from 'react';
import Nodes from '../components/cluster_objects/Nodes.jsx';
import Namespaces from '../components/cluster_objects/Namespaces.jsx';
import ApiResources from '../components/cluster_objects/ApiResources.jsx';

const ClustersDetailsContainer = () => {
  return (
    <div className="clusterDetailsContainer">
      <div className="ClustersContainer1">
        <div className="ClusterObjectsContainer">
          <Nodes />
          <Namespaces />
        </div>
      </div>
      <ApiResources />
    </div>
  );
};

export default ClustersDetailsContainer;