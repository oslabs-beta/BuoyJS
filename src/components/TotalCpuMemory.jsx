import React from 'react';

const TotalCpuMemory = props => {
  return (
    <div className="TotalCpuMemoryContainer">
      <p>Total CPU: <span id="TotalCpu">{/*props.totalCpu*/}</span></p>
      <p>Total Memory: <span id="TotalMemory">{/*props.totalMemory*/}</span></p>
    </div>
  )
}

export default TotalCpuMemory;