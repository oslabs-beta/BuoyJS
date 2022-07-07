/**
 * ************************************
 *
 * @module ApiResources.jsx
 * @author team Buoy
 * @description React Component for loading and displaying api resources
 *
 * ************************************
 */

import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';

const ApiResources = () => {

  const [ apiResources, setApiResources ] = useState([]);

  useEffect( () => {

    // on page load, requests to IPC listener in kubeClient for resource data
    ipcRenderer.send('load:apiResources');
    ipcRenderer.on('get:apiResources', (e, data) => {
      setApiResources(data);
    });
    
  }, []);
  
  return (
    <div className="api-resources-container">
      <div className="api-resources-header">
        Api Resources
        </div>
        <div className="api-resources-item">
          { apiResources.err }
          { apiResources.stdout }
          { apiResources.stderr }
        </div>
    </div>
  );
};

export default ApiResources;