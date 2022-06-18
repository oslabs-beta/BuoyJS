import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import { useDispatch } from 'react-redux';
import { addServices } from '../../reducers/clustersSlice';

const Services = (props) => {

  const [ services, setServices ] = useState([]);
  const dispatch = useDispatch();

  useEffect( () => {
    ipcRenderer.send('load:services');
    ipcRenderer.on('get:services', (e, data) => {
      dispatch(addServices(data));
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
            { services.map( (service, idx) => {
              // console.log('service namespace: ', service.namespace);
              // console.log('props namespace: ', props.namespace);
              if (service.namespace == props.namespace) {
                return (
                  <div key={`${service}${idx}`} className="service-item">
                  {service.name} {service.namespace} { service.type } {service.clusterIP}
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


export default Services;