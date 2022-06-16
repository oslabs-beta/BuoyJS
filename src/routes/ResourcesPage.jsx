import React, { useState } from 'react';

// import containers
import TestContainer2 from '../containers/TestContainer2.jsx';
import TestContainer1 from '../containers/TestContainer1.jsx';
import ResourcesContainer from '../containers/ResourcesContainer.jsx';
import ControlPlaneAPI from '../containers/control_plane/ControlPlaneAPI.jsx';
import ControlPlaneScheduler from '../containers/control_plane/ControlPlaneScheduler.jsx';
import ControllerManager from '../containers/control_plane/ControllerManager.jsx';

const SecondPage = () => {

  const tabs = ['clusters', 'resources', 'control_plane', 'alerts'];

  const [active, setActive] = useState(tabs[0]);

  return (
    <div className="SecondPage">

      <div className="SecondPageHeader">
        <h1>Metrics</h1>
      </div>
        <div className="Container2">
          <div className="SecondPageButtons">
            <button id="clustersButton" active={active === 'clusters'} onClick={ () => setActive('clusters') }> clusters </button>
            <button id="resourcesButton" active={active === 'resources'} onClick={ () => setActive('resources') }> resources </button>
            <button id="control_plane_button" active={active === 'control_plane'} onClick={ () => setActive('control_plane') }> control plane </button>
            <button id="alertsButton" active={active === 'alerts'} onClick={ () => setActive('alerts') }> alerts </button>
          </div>
          <div className="OuterContainer">
            { active === 'clusters' && <TestContainer1/> }
            { active === 'resources' && <ResourcesContainer/> }
            { active === 'control_plane' && <ControlPlaneAPI /> }
            { active === 'control_plane' && <ControlPlaneScheduler /> }
            { active === 'control_plane' && <ControllerManager /> }
            {/* { active === 'alerts' && <TestContainer4/> } */}
          </div>
        </div>
    </div>
  );

};

export default SecondPage;