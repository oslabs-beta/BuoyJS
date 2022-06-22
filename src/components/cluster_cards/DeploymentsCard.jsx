import React from 'react';
import Deployment from './Deployment.jsx';

const DeploymentsCard = (props) => {  
  return (
    <div className="objectsCardInfoCx">
      <p className="objectCardExpandHeader">Deployments</p>
      <div className="ObjectCardContentCx">
      {
        props.namespace.deployments.map( (deployment,idx) =>

        <Deployment
          key={`${deployment.name}${idx}`}
          name={deployment.name} 
          replicas={deployment.replicas}>
        </Deployment>
        )
      }
      </div>
    </div>
  );

}


export default DeploymentsCard;