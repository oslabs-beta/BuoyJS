import React from 'react';
import WorkQueue from '../../components/controller_manager/WorkQueue.jsx';
import WorkQueueGraph from '../../components/controller_manager/WorkQueueGraph.jsx';

const ControllerManager = () => {

  return (
    <div className="ControllerManagerContainer">
      <p> Controller Manager </p>
      <div className="ControllerManagerDiv">
        <div className="ControllerDiv1">
          <WorkQueue />
        </div>
        <div className="ControllerDiv2">
          <WorkQueueGraph />
        </div>
      </div>
    </div>
  );
};

export default ControllerManager;
