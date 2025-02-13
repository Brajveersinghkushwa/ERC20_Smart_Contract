// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Create a root.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Initial render: Render the root component of your application.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);