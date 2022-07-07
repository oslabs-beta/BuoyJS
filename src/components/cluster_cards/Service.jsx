/**
 * ************************************
 *
 * @module Service.jsx
 * @author team Buoy
 * @description React Component for rendering Service info in Clusters card
 *
 * ************************************
 */

import React from 'react';

const Service = (props) => {  

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
            <span className="objectCardInfoProp">Type: </span>
            <span className="objectCardInfoAttr">{ props.type }</span>
          </li>
          <li>
            <span className="objectCardInfoProp">IP: </span>
            <span className="objectCardInfoAttr">{ props.clusterIP }</span>
          </li>
          <li>
            <span className="objectCardInfoProp">Ports: </span>
            <span className="objectCardInfoAttr">
              { props.ports.map( (portInfo) => {
                return (
                  `${portInfo.port}${portInfo.nodePort === undefined ? '' : ':'+ portInfo.nodePort}/${ portInfo.protocol}`
                );
              }).join(', ') }
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Service;