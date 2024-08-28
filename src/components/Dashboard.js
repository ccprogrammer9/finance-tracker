import React, { useState, useEffect } from 'react';
import '../App.css'; // Ensure correct path to CSS

const Dashboard = () => {
    const [budgets, setBudgets] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        // Load budgets from local storage
        const savedBudgets = JSON.parse(localStorage.getItem('budgets')) || [];
        console.log('Budgets from local storage:', savedBudgets);
        setBudgets(savedBudgets);
    }, []);

    useEffect(() => {
        // Load transactions from local storage
        const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
        console.log('Transactions from local storage:', savedTransactions);
        setTransactions(savedTransactions);
    }, []);

    useEffect(() => {
        // Log budgets whenever they change
        console.log('Current budgets:', budgets);
    }, [budgets]);

    useEffect(() => {
        // Log transactions whenever they change
        console.log('Current transactions:', transactions);
    }, [transactions]);

    // Function to calculate total expenses for a given category
    const calculateTotalForCategory = (category) => {
        return transactions
            .filter(txn => txn.category === category)
            .reduce((total, txn) => total + txn.amount, 0);
    };

    // Function to calculate remaining budget for a given category
    const calculateRemainingBudget = (category) => {
        const budget = budgets.find(budget => budget.category === category);
        if (budget) {
            return budget.amount - calculateTotalForCategory(category);
        }
        return 0;
    };

    return (
        <div className="dashboard-container">
            <h2 style={{ textAlign: 'center' }}>Dashboard</h2>
            <ul className="budget-list">
                {budgets.map(budget => (
                    <li key={budget.id}>
                        {budget.category}: ${calculateRemainingBudget(budget.category).toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;



