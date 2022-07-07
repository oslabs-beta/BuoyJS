/**
 * ************************************
 *
 * @module ClustersContainer.jsx
 * @author team Buoy
 * @description React Component for rendering Card-view or Grid-view Components
 *
 * ************************************
 */

import React, { useState } from 'react';
import ClustersCardsContainer from '../containers/ClustersCardsContainers.jsx';
import ClustersDetailsContainer from '../containers/ClustersDetailsContainer.jsx';
import Header from '../components/Header.jsx';
import { AiFillCodeSandboxCircle } from 'react-icons/ai';
import { BsFillFilterCircleFill } from 'react-icons/bs';

const ClustersContainer = () => {

  const [ clustersTab, changeTab ] = useState(false);

  return (
    <div className="clustersContentCx">
      <Header />
      <div className="clusterTabButtons">
        <button id="changeClusterViewBtn" onClick={ () => changeTab(!clustersTab) }>
          { clustersTab ? <AiFillCodeSandboxCircle size="1.2em"/> : <BsFillFilterCircleFill size="1.2em" />}
        </button>
      </div>

      { !clustersTab && <ClustersCardsContainer/>}
      { clustersTab && <ClustersDetailsContainer/>}
    </div>
  );
};

export default ClustersContainer;