import React from 'react';

const Service = (props) => {

  const {name, type, id, clusterIP} = props;

  return (
    <div>
      <div key={`${name}${id}`} className="service-item">
        <span>{name}</span>
        <span>{`${type}: ${clusterIP}`}</span>
      </div>
    </div>
  );
};

export default Service;