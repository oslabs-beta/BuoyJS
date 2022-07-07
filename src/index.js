/**
 * ************************************
 *
 * @module index.js
 * @author team Buoy
 * @description Entry point of application
 *
 * ************************************
 */

 import React from 'react';
 import App from './App.jsx';
 import { createRoot } from 'react-dom/client';
 import { Provider } from 'react-redux';
 import { BrowserRouter } from 'react-router-dom';
 
 import store from './store';
 import './assets/css/styles.css';
 
 // creates root from div in HTML file
 const root = createRoot(document.getElementById('root'));
 
 // renders all elements to application and distributes store contents
 root.render(
   <Provider store={store}>
     <BrowserRouter>
       <App />
     </BrowserRouter>
   </Provider>
 );
 