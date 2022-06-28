import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadKubeClientData } from '../controllers/loadKubeClientData';
import { loadPromClientData } from '../controllers/loadPromClientData';

// import pages
// import ClustersPage from './routes/ClustersPage.jsx';
import Frame from './routes/Frame.jsx';
import HomePage from './routes/HomePage.jsx';
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

const App = () => {

	const dispatch = useDispatch();
	
	
	useEffect(() => {
		loadKubeClientData(dispatch);
		loadPromClientData(dispatch);
	}, [])

	setInterval(() => {
		loadPromClientData(dispatch)
	}, 15000)
	// useEffect(() => {
	
	// 	loadPromClientData(dispatch);
	
	// }, []);

	return (
		
		<div className="App">
			<Frame />
			{/* <Route path="/" element={<HomePage />} /> */}
			{/* <Route path="resources" element={<SecondPage />} /> */}
			<MainPage />
			{/* <HomePage /> */}
		</div>
	);
};

export default App;