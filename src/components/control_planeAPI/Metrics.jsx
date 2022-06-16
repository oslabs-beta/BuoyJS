import React from 'react';

const Metrics = () => {
  return (
    <div className="OuterMetricsBox">
      <div className="MetricsDisplay">
        <p>Latency: </p>
        <p>Request Per Second: </p>
        <p>Error Rate: </p>
        <p>Network Saturation: </p>
      </div>
    </div>
  );
};

export default Metrics;