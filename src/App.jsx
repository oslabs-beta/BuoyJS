/**
 * ************************************
 *
 * @module App.jsx
 * @author team Buoy
 * @description React Component to wrap the entire Application
 *
 * ************************************
 */

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { loadKubeClientData } from './controllers/loadKubeClientData';
import { promClientListeners, promClientEmitters } from './controllers/loadPromClientData';

// import pages
import Frame from './routes/Frame.jsx';
import MainPage from './routes/MainPage.jsx';

// imports css 
import './assets/css/Frame.css';
import './assets/css/HomePage.css';
import './assets/css/MainPage.css';
import './assets/css/resources.css';
import './assets/css/ClustersContainer.css';
import './assets/css/ClusterDetailsContainer.css';
import './assets/css/ClustersCardsContainer.css'
import './assets/css/ControlPlaneAPI.css';
import './assets/css/ControlPlaneScheduler.css';
import './assets/css/ControllerManager.css';
import './assets/css/Header.css';
import './assets/css/NodeChartsContainer.css';

const App = () => {

const dispatch = useDispatch();

  // on page load, fetch prometheus and kubernetes API data
  //        
  useEffect(() => {
    promClientListeners(dispatch);
    loadKubeClientData(dispatch);
    promClientEmitters();	
  }, []);

  return (
    
    <div className="App">
      <Frame />
      <MainPage />
    </div>
  );
};

export default App;