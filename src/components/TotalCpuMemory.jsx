/**
 * ************************************
 *
 * @module TotalCpuMemory.jsx
 * @author team Buoy
 * @description React Component for displaying total cpu and total memory
 *
 * ************************************
 */

import React from 'react';

const TotalCpuMemory = props => {
  return (
    <div className="TotalCpuMemoryContainer">
      <p>Total CPU: <span id="TotalCpu">{ props.totalCpu }</span></p>
      <p>Total Memory: <span id="TotalMemory">{ props.totalMem }</span></p>
    </div>
  );
};

export default TotalCpuMemory;