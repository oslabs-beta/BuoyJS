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
          <div className="ClusterObjectsHeader">
            <p> Namespaces </p>
          </div>
          <div className="ClusterObjects"></div>
          <div>
            { useSelector(selectNamespaces).map( (namespace, idx) =>
            <>
              <div key={`${namespace}${idx}`} className="namespace-item">{namespace.name} </div>
              <div key={`status${namespace}${idx}`} className="status">Status: {namespace.status}</div>
              <Deployments namespace={namespace.name}/>
              <Pods namespace={namespace.name}/>
              <Services namespace={namespace.name}/>
            </>
            )}
          </div>
        </div>
    </div>
  );

}


export default Namespaces;