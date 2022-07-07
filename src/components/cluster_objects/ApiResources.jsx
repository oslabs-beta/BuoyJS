import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';

const ApiResources = () => {

  const [ apiResources, setApiResources ] = useState([]);

  useEffect( () => {

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

}


export default ApiResources;