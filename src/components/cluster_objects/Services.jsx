import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';

const Services = () => {

  const [ services, setServices ] = useState([]);

  useEffect( () => {

    ipcRenderer.send('load:services');
    ipcRenderer.on('get:services', (e, data) => {
      setServices(data);
    });
    // { service.ports} 
  }, []);
  
  return (
    <div className="ClustersContainer1">
        <div className="ClusterObjectsContainer">
          <div className="ClusterObjectsHeader">
            <p> Services </p>
          </div>
          <div className="ClusterObjects"></div>
          <div>
            { services.map( (service, idx) =>
              <div key={`${service}${idx}`} className="service-item">
              {service.name} {service.namespace} { service.type } {service.clusterIP}
              </div>
            )}
          </div>
        </div>
    </div>
  );

}


export default Services;