import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.jsx';
import './index.css'; // 🚨 Critical: Imports the global black reset

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);