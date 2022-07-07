/**
 * ************************************
 *
 * @module DefaultResourcesCard.jsx
 * @author team Buoy
 * @description React Component for Resources Cards
 *
 * ************************************
 */

import React from 'react';

// where data coming from may not be props .... subject to change

const DefaultResourcesCard = props => {
  return (
    <div className="ClusResCardContainer">
      <div className="ResourceMetrics">
        <h3>Network Resources</h3>
        <ul className="ResourcesList">
          <li>Latency: <span>{/*props.latency*/}</span></li>
          <li>Requests per second: <span>{/*props.rps*/}</span></li>
          <li>Error rate: <span>{/*props.errorRate*/}</span></li>
          <li>Network saturation: <span>{/*props.networkSat*/}</span></li>
        </ul>
      </div>
    </div>
  );
};

export default DefaultResourcesCard;