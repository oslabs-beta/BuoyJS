/**
 * ************************************
 *
 * @module Depl.jsx
 * @author team Buoy
 * @description React Component for displaying deployments info in Clusters page
 *
 * ************************************
 */

import React from 'react';

const Depl = (props) => {

  const {name, replicas, id} = props;

  return (
    <div>
      <div key={`${name}${id}`} className="deployment-item">
        <span id="deplname">{name}</span><span id="deplrepl">Replicas: {replicas}</span>
      </div>
    </div>
  );
};

export default Depl;