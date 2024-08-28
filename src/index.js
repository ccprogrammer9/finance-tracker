// src/index.js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css'; // Import for global styles if needed
import './App.css'; // Import your consolidated CSS styles
import App from './App'; // Import the consolidated App component
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>
);

// Measure performance if needed
reportWebVitals();
