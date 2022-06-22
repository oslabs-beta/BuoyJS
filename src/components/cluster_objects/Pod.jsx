import React from 'react';

const Pod = (props) => {

  const {name, podIP, status, id} = props;

  return (
    <div>
      <div key={`${name}${id}`} className="pod-item">
        <span id="podname">{name}</span>
        <span id="podrepl">{status}</span>
        <span id="podip">IP: {podIP}</span>
      </div>
    </div>
  );
};

export default Pod;