import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DebtTracker from './components/DebtTracker';
import RepaymentPlans from './components/RepaymentPlans';
import Transactions from './components/Transactions';
import Budget from './components/Budget';
import './App.css'; // General styles for the app layout

const App = () => {
    const [budgets, setBudgets] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [debts, setDebts] = useState([]);

    useEffect(() => {
        const savedBudgets = JSON.parse(localStorage.getItem('budgets')) || [];
        setBudgets(savedBudgets);
    }, []);

    useEffect(() => {
        const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
        setTransactions(savedTransactions);
    }, []);

    useEffect(() => {
        const savedDebts = JSON.parse(localStorage.getItem('debts')) || [];
        setDebts(savedDebts);
    }, []);

    return (
        <div className="App">
            <Header />
            <main className="content-container">
                <DebtTracker debts={debts} setDebts={setDebts} />
                <RepaymentPlans debts={debts} />
                <Budget setBudgets={setBudgets} />
                <Transactions setTransactions={setTransactions} />
            </main>
        </div>
    );
};

export default App;
