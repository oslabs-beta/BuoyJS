import React, { useState } from 'react';

import TestContainer2 from '../containers/TestContainer2.jsx';
import TestContainer1 from '../containers/TestContainer1.jsx';

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
            { active === 'resources' && <TestContainer2/> }
          </div>
        </div>
    </div>
  );

};

export default SecondPage;