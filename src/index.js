import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Budget from './components/Budget';
import Styles from './styles.css';

const App = () => {
    return (
        <Router>
            <Header />
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<MainContent />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/transactions" element={<Transactions />} />
                        <Route path="/budget" element={<Budget />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// Measure performance if needed
reportWebVitals();
