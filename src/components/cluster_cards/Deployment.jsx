/**
 * ************************************
 *
 * @module Deployment.jsx
 * @author team Buoy
 * @description React Component for rendering deployment info in Clusters cards
 *
 * ************************************
 */

import React from 'react';

const Deployment = (props) => {  

  const toggleDetailsOn = (event) => {
    const details = event.currentTarget.parentElement.lastChild;
    details.classList.add('active');
  };

  const toggleDetailsOff = (event) => {
    const details = event.currentTarget.lastChild;
    details.classList.remove('active');
  };

  return (
    <div onMouseLeave={ toggleDetailsOff }>
      <div className="objectCardName" onMouseOver={ toggleDetailsOn }>{props.name}</div>
      <div className="objectCardInfo">
        <ul>
          <li>
            <span className="objectCardInfoProp">Replicas: </span> 
            <span className="objectCardInfoAttr">{ props.replicas }</span></li>
        </ul>
      </div>
    </div>
  );
};

export default Deployment;