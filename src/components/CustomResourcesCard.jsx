import React from 'react';

// where data coming from may not be props .... subject to change

const CustomResourcesCard = props => {
  return (
    <div className="ClusResCardContainer">
      <div className="ResourceMetrics">
        <h3>Custom Resources</h3>
        <ul className="ResourcesList">
          <li>{} <span>{/*props.latency*/}</span></li>
        </ul>
      </div>
    </div>
  );
};

export default CustomResourcesCard;