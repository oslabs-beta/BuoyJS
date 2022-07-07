/**
 * ************************************
 *
 * @module ServicesCard.jsx
 * @author team Buoy
 * @description React Component for rendering Service components in Clusters card
 *
 * ************************************
 */

import React from 'react';
import Service from './Service.jsx';

const ServicesCard = (props) => {  
  return (
    <div className="servicesCardInfoCx">
      <p className="objectCardExpandHeader">Services</p>
      <div className="ObjectCardContentCx">
      {
        props.namespace.services.map( (service,idx) => {
          return(
            <Service
              key={`${service.name}${idx}`}
              name={service.name}
              type={ service.type }
              clusterIP={service.clusterIP}
              ports={service.ports}
            />
          )
        })
      }
      </div>
    </div>
  );
};


export default ServicesCard;