import React, { useState } from 'react';
import { ipcRenderer } from 'electron';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNamespaces, selectNamespaces } from '../../reducers/clustersSlice';

const Namespaces = () => {

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
              <div key={`${namespace}${idx}`} className="namespace-item">
              {namespace.name} {namespace.status}
              </div>
            )}
          </div>
        </div>
    </div>
  );

}


export default Namespaces;