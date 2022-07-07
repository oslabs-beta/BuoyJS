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
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ipcRenderer } from 'electron';

import { loadKubeClientData } from '../controllers/loadKubeClientData';
import { promClientListeners, promClientEmitters } from '../controllers/loadPromClientData';

// import pages
import Frame from './routes/Frame.jsx';
import MainPage from './routes/MainPage.jsx';

// imports css 
import '../assets/Frame.css';
import '../assets/HomePage.css';
import '../assets/MainPage.css';
import '../assets/resources.css';
import '../assets/ClustersContainer.css';
import '../assets/ClusterDetailsContainer.css';
import '../assets/ClustersCardsContainer.css'
import '../assets/ControlPlaneAPI.css';
import '../assets/ControlPlaneScheduler.css';
import '../assets/ControllerManager.css';
import '../assets/Header.css';
import '../assets/NodeChartsContainer.css';

const App = () => {

	const dispatch = useDispatch();

	// on page load, fetch prometheus and kubernetes API data
	useEffect(() => {
		promClientListeners(dispatch);
		loadKubeClientData(dispatch);
	  promClientEmitters();	
	}, [])

	return (
		
		<div className="App">
			<Frame />
			<MainPage />
		</div>
	);
};

export default App;