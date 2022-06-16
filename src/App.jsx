import React from 'react';
import HomePage from './routes/HomePage.jsx';
import ClustersPage from './routes/ClustersPage.jsx';

import '../assets/HomePage.css';

const App = () => {

	return (
		<div className="App">
			<HomePage/>
			<ClustersPage />
		</div>
	);

};

export default App;