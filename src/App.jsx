import React, { useEffect } from 'react';

// import pages
// import ClustersPage from './routes/ClustersPage.jsx';
import HomePage from './routes/HomePage.jsx';
import MainPage from './routes/MainPage.jsx';
import Header from './routes/Header.jsx';

import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadKubeClientData } from '../controllers/loadKubeClientData';


// imports css 
import '../assets/HomePage.css';
import '../assets/MainPage.css';
import '../assets/resources.css';
import '../assets/ClusterContainer.css';
import '../assets/ClustersCardsContainer.css'
import '../assets/ControlPlaneAPI.css';
import '../assets/ControlPlaneScheduler.css';
import '../assets/ControllerManager.css';
import '../assets/Header.css';

const App = () => {

	const dispatch = useDispatch();

	useEffect(() => {

		loadKubeClientData(dispatch);

	}, []);

	return (
		
		<div className="App">
					{/* <Route path="/" element={<HomePage />} /> */}
					{/* <Route path="resources" element={<SecondPage />} /> */}
					<Header />
					<MainPage />
					{/* <HomePage /> */}
		</div>
	);
};

export default App;