import React from 'react';

// where data coming from may not be props .... subject to change

const ClusterResourcesCard = props => {
  return (
    <div className="ClusResCardContainer">
      <div className="ResourceMetrics">
        <ul>
          <li>Latency: <span>{/*props.latency*/}</span></li>
          <li>Requests per second: <span>{/*props.rps*/}</span></li>
          <li>Error rate: <span>{/*props.errorRate*/}</span></li>
          <li>Network saturation: <span>{/*props.networkSat*/}</span></li>
        </ul>
      </div>
      <div className="ResourceGraphs"> Graphs </div>
    </div>
  )
}

export default ClusterResourcesCard;