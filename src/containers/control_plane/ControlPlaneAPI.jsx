import React from 'react';
import Metrics from '../../components/control_planeAPI/Metrics.jsx';
import MetricsGraph from '../../components/control_planeAPI/MetricsGraph.jsx';
import NetworkLatencyGraph from '../../components/control_planeAPI/NetworkLatencyGraph.jsx';

const ControlPlaneAPI = () => {

  return (
    <div className="CPAPIContainer">
      <p> API Server </p>
      <div className="CPcontainerDiv">
        <div className="CPcontDiv1">
          <Metrics />
        </div>
        <div className="CPcontDiv2">
          <MetricsGraph />
          <NetworkLatencyGraph />
        </div>
      </div>
    </div>
  );
};

export default ControlPlaneAPI;
