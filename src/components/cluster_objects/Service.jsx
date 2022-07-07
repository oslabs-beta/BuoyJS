/**
 * ************************************
 *
 * @module Service.jsx
 * @author team Buoy
 * @description React Component for displaying services info in Clusters page
 *
 * ************************************
 */

import React from 'react';

const Service = (props) => {

  const {name, type, id, clusterIP} = props;

  return (
    <div>
      <div key={`${name}${id}`} className="service-item">
        <span>{name}</span>
        <span>{`${type}: ${clusterIP}`}</span>
      </div>
    </div>
  );
};

export default Service;