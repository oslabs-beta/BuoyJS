import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectNamespaces } from '../../reducers/clustersSlice';

const Services = (props) => {
  return (
    <div className="ClustersContainer1">
        <div className="ClusterObjectsContainer">
          <div className="ClusterObjectsHeader">
            <p> Services </p>
          </div>
          <div className="ClusterObjects"></div>
          <div>
            { useSelector(selectNamespaces).map( namespace => {
              if (namespace.name === props.namespace) {
                return namespace.services.map( (service, idx) => {
                  return (
                    <div key={`${service.name}${idx}`} className="service-item">
                    <span>{service.name}</span> <span>{ service.type }</span> <span>{service.clusterIP}</span>
                    </div>
                  )
                })
              }
            })}
          </div>
        </div>
    </div>
  );

}


export default Services;