import React, { useState } from 'react';
import { ipcRenderer } from 'electron';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNamespaces, selectNamespaces } from '../../reducers/clustersSlice';
import Deployments from './Deployments.jsx';
import Pods from './Pods.jsx';
import Services from './Services.jsx';



const Namespaces = () => {
  // console.log('selectNamespaces:', useSelector(selectNamespaces));
  const dispatch = useDispatch();

  useEffect( () => {

    ipcRenderer.send('load:namespaces');
    ipcRenderer.on('get:namespaces', (e, data) => {
      dispatch(addNamespaces(data));
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
                  <div className="NamespaceContainer">
                    <div key={`${namespace}${idx}`} className="namespace-item"><p id="name">{namespace.name}</p><p id={`${namespace.status}`}>{namespace.status}</p> </div>
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