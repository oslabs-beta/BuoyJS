import React from 'react';
import { ipcRenderer } from 'electron';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNamespaces, addDeployments, addPods, addServices, selectNamespaces } from '../../reducers/clustersSlice';
import Deployments from './Deployments.jsx';
import Pods from './Pods.jsx';
import Services from './Services.jsx';



const Namespaces = () => {

  const dispatch = useDispatch();

  useEffect( () => {

    ipcRenderer.send('load:namespaces');
    const namespaceEvtTgt = ipcRenderer.on('get:namespaces', (e, data) => {
      dispatch(addNamespaces(data));
    });

    ipcRenderer.send('load:deployments');
    const deploymentEvtTgt = ipcRenderer.on('get:deployments', (e, data) => {
      dispatch(addDeployments(data));
      console.log("here: ", e);
    });

    ipcRenderer.send('load:pods');
    const podEvtTgt = ipcRenderer.on('get:pods', (e, data) => {
      dispatch(addPods(data));
    });

    ipcRenderer.send('load:services');
    const serviceEvtTgt = ipcRenderer.on('get:services', (e, data) => {
      dispatch(addServices(data));
    });

  }, []);

  return (
    <div className="ClustersContainer1">
        <div className="ClusterObjectsContainer">
          <div className="PrimaryClusterObjectsHeader">
            <p> Current Namespaces </p>
          </div>
          <div className="ClusterObjects"></div>
          <div>
            { useSelector(selectNamespaces).map( (namespace, idx) => {
              if (namespace.name) {
                return (
                  <div key={`${namespace.name}${idx}`} className="NamespaceContainer">
                    <div className="namespace-item"><p id="name">{namespace.name}</p><p id={`${namespace.status}`}>{namespace.status}</p> </div>
                    <Deployments namespace={namespace.name}/>
                    <Pods namespace={namespace.name}/>
                    <Services namespace={namespace.name}/>
                  </div>
                );
              }
            }
            )}
          </div>
        </div>
    </div>
  );

}


export default Namespaces;