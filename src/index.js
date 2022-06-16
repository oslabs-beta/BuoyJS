import React from 'react';
import App from './App.jsx';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store';
import '../assets/styles.css'

// Now we can render our application into it
const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
