import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';

const Deployments = () => {

  const [ deployments, setDeployments ] = useState([]);

  useEffect( () => {

    ipcRenderer.send('load:deployments');
    ipcRenderer.on('get:deployments', (e, data) => {
      setDeployments(data);
    });
    
  }, []);
  
  return (
    <div className="ClustersContainer1">
        <div className="ClusterObjectsContainer">
          <div className="ClusterObjectsHeader">
            <p> Deployments </p>
          </div>
          <div className="ClusterObjects"></div>
          <div>
            { deployments.map( (deployment, idx) =>
              <div key={`${deployment}${idx}`} className="deployment-item">
              {deployment.name} {deployment.namespace} {deployment.replicas}
              </div>
            )}
          </div>
        </div>
    </div>
  );

}


export default Deployments;