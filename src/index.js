import React from 'react';
import App from './App.jsx';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store';
import '../assets/styles.css'


// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

// Now we can render our application into it
const content = createRoot(document.getElementById('root'));

content.render(
  <Provider store={store}>
    <App />
  </Provider>
)