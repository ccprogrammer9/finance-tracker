//App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budget from './pages/Budget';
import './App.css'; // Ensure you have styles to support the layout

function App() {
    return (
        <Router>
            <div className="App">
                <Sidebar />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/transactions" element={<Transactions />} />
                        <Route path="/budget" element={<Budget />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;

