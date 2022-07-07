/**
 * ************************************
 *
 * @module MemUsage.jsx
 * @author team Buoy
 * @description React Component for displaying memory usage
 *
 * ************************************
 */

import React from 'react';

const MemUsage = props => {
  return (
    <div className="MemUsageContainer">
      <h3>Memory Usage:</h3>
      <p id="MemUsage">{ props.memUsage }</p>
    </div>
  );
};

export default MemUsage;