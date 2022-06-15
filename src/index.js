import React from 'react';
import { render } from 'react-dom';
import App from './routes/App.jsx';
import store from './store';
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client';


// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div')

root.id = 'root'
document.body.appendChild(root);

const root = createRoot(document.getElementById('contents'));

// Now we can render our application into it
root.render(
//   <Provider/>
//     <App />
// </Provider>
);