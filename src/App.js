import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Budget from './components/Budget';
import './App.css'; // General styles for the app layout

const App = () => {
    const [budgets, setBudgets] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        // Load budgets from local storage
        const savedBudgets = JSON.parse(localStorage.getItem('budgets')) || [];
        setBudgets(savedBudgets);
    }, []);

    useEffect(() => {
        // Load transactions from local storage
        const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
        setTransactions(savedTransactions);
    }, []);

    return (
        <div className="App">
            <Header /> {/* Contains the slideshow component */}
            <main className="content-container">
                {/* Budget Summary and Dashboard */}
                <div className="summary-dashboard-container">
                    <h2 style={{ textAlign: 'center' }}>Budget Summary</h2>
                    <ul>
                        {budgets.map(budget => (
                            <li key={budget.id}>
                                {budget.category}: ${budget.amount.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Include Dashboard and pass budgets and transactions as props */}
                <Dashboard budgets={budgets} transactions={transactions} />
                <Budget setBudgets={setBudgets} />
                <Transactions setTransactions={setTransactions} />
            </main>
        </div>
    );
};

export default App;
