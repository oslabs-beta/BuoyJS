import React from 'react';

// import pages
// import ClustersPage from './routes/ClustersPage.jsx';
import HomePage from './routes/HomePage.jsx';
import SecondPage from './routes/ResourcesPage.jsx';

import { Route, Routes } from 'react-router-dom';

// imports css 
import '../assets/HomePage.css';
import '../assets/SecondPage.css';
import '../assets/resources.css';
import '../assets/ClusterContainer.css';
import '../assets/ControlPlaneAPI.css';
import '../assets/ControlPlaneScheduler.css';
import '../assets/ControllerManager.css';

const App = () => {
	
	return (
		
		<div className="App">
					{/* <Route path="/" element={<HomePage />} /> */}
					{/* <Route path="resources" element={<SecondPage />} /> */}
					<SecondPage />
					{/* <HomePage /> */}
		</div>
	);
};

export default App;