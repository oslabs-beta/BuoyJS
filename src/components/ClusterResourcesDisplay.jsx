/**
 * ************************************
 *
 * @module ClusterResourcesDisplay.jsx
 * @author team Buoy
 * @description React Component for rendering Resources components
 *
 * ************************************
 */

import React from 'react';
import DefaultResourcesCard from './DefaultResourcesCard.jsx';
import CustomResourcesCard from './CustomResourcesCard.jsx';

const ClusterResourcesDisplay = props => {
  return (
    <div className="ClusResDispContainer">
      <h2>Cluster Resources</h2>
      <DefaultResourcesCard />  
      <CustomResourcesCard labels={props.labels} metrics={props.metrics}/> 
    </div>
  );
};

export default ClusterResourcesDisplay;