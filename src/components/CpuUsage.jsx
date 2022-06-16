import React from 'react';

const CpuUsage = props => {
  return (
    <div className="CpuUsageContainer">
      <h3>CPU Usage:</h3>
      <p id="CpuUsage">{/*props.cpuUsage*/}</p>
    </div>
  )
}

export default CpuUsage;