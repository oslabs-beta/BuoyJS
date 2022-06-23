import React from 'react';

const Depl = (props) => {

  const {name, replicas, id} = props;

  return (
    <div>
      <div key={`${name}${id}`} className="deployment-item">
        <span id="deplname">{name}</span><span id="deplrepl">Replicas: {replicas}</span>
      </div>
    </div>
  );
};

export default Depl;