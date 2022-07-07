/**
 * ************************************
 *
 * @module CpuUsage.jsx
 * @author team Buoy
 * @description React Component for rendering CpuUsage
 *
 * ************************************
 */

import React from 'react';

const CpuUsage = props => {
  return (
    <div className="CpuUsageContainer">
      <h3>CPU Usage:</h3>
      <p id="CpuUsage">{ props.cpuUsage }</p>
    </div>
  );
};

export default CpuUsage;