import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectNamespaces } from '../../reducers/clustersSlice';

const Deployments = (props) => {  
  return (
    <div className="ClustersContainer1">
        <div className="ClusterObjectsContainer">
          <div className="ClusterObjectsHeader">
            <p> Deployments </p>
          </div>
          <div className="ClusterObjects"></div>
          <div>
            { useSelector(selectNamespaces).map( namespace => {
              if (namespace.name === props.namespace) {
                return namespace.deployments.map( (deployment, idx) => {
                  return (
                    <div key={`${deployment.name}${idx}`} className="deployment-item">
                    <span id="deplname">{deployment.name}</span>
                    <span id="deplrepl">Replicas: {deployment.replicas}</span>
                    </div>
                  )
                })
              }
            })}
          </div>
        </div>
    </div>
  );

}


export default Deployments;