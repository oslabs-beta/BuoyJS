import React from 'react';
import ClusterObjects from '../components/ClusterObjects.jsx';
import ApiResources from '../components/cluster_objects/ApiResources.jsx';
import Deployments from '../components/cluster_objects/Deployments.jsx';
import Namespaces from '../components/cluster_objects/Namespaces.jsx';
import Pods from '../components/cluster_objects/Pods.jsx';
import Services from '../components/cluster_objects/Services.jsx';
// import { ipcRenderer } from 'electron';

const ClustersContainer = () => {

  const objectsArr = [];
  for (let i = 0; i < 10; i++) {
    objectsArr.push(<ClusterObjects key={`clusterobject-${i}`}/>);
  }

  return (
    <div className="ClustersOuterContainer">
      <div className="ApdexHeaderBox">
        <h1>Apdex Score</h1>
      </div>
      <Namespaces />
      <Deployments />
      <Pods />
      <Services />
      <ApiResources />
    </div>
  );
  /*
  return( 
    <div className="ClustersOuterContainer">
      <div className="ApdexHeaderBox">
        <h1>Apdex Score</h1>
      </div>
      <div className="ClustersContainer1">
        <div className="ClusterObjectsContainer">
          <div className="ClusterObjectsHeader">
            <p> Objects </p>
          </div>
          <div className="ClusterObjects">
            { objectsArr }
          </div>
        </div>
      </div>
    </div>
  );
  */

}

  
//   ipcRenderer.on('get:deployments', (e, deployments) => {
//     console.log(deployments);
//   });

//   ipcRenderer.on('get:pods', (e, pods) => {
//     console.log(pods);
//   });

//   ipcRenderer.on('get:services', (e, services) => {
//     console.log(services);
//   });
  
//   //window.electronAPI.setTitle(title);

//   return (
//     <div>Clusters Container
//     </div>
//   );
// };

export default ClustersContainer;