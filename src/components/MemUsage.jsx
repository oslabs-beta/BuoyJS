import React from 'react';

const MemUsage = props => {
  console.log(props)
  return (
    <div className="MemUsageContainer">
      <h3>Memory Usage:</h3>
      <p id="MemUsage">{ props.memUsage }</p>
    </div>
  )
}

export default MemUsage;