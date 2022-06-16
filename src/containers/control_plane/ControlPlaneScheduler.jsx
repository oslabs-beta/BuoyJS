import React from 'react';
import Scheduler from '../../components/scheduler/Scheduler.jsx';


const ControlPlaneScheduler = () => {

  return (
    <div className="CPSchedulerContainer">
      <p> Scheduler </p>
      <div className="CPSchedulerContDiv">
        <Scheduler />
      </div>
    </div>
  );
};

export default ControlPlaneScheduler;
