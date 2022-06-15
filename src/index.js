import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.jsx';

const container = document.getElementById('root');
const root = createRoot(container);

// Now we can render our application into it
root.render(<App />);