/**
 * ************************************
 *
 * @module NodePod.jsx
 * @author team Buoy
 * @description React Component for displaying node pod information 
 *
 * ************************************
 */

import React from 'react';

const NodePod = (props) => {

  const { name, podIP, status } = props;

  return (
    <div>
      <div className="pod-item">
        <span id="podname">{name}</span>
        <span id="podrepl">{status}</span>
        <span id="podip">IP: {podIP}</span>
      </div>
    </div>
  );
};

export default NodePod;