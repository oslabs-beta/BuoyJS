import React from 'react';

const Pod = (props) => {

  const {name, podIP, status, id} = props;
  console.log(props);

  return (
    <div>
      <div key={`${name}${id}`} className="pod-item">
        <span id="podname">{name}</span>
        <span id="podrepl">Status: {status}</span>
        <span id="podip">Pod IP: {podIP}</span>
      </div>
    </div>
  );
};

export default Pod;