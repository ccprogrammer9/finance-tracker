// src/components/Transactions.js
// Implement a form to add new transactions and display a list of all transactions.
// Save data to local storage

import React, { useState, useEffect } from 'react';
import TransactionList from './TransactionList'; // Import TransactionList

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
        setTransactions(savedTransactions);
    }, []);

    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);

    const handleAddTransaction = (e) => {
        e.preventDefault();
        if (!description || isNaN(amount) || amount <= 0) {
            setError('Please provide a valid description and amount.');
            return;
        }
        setError('');
        setTransactions([
            ...transactions,
            { id: transactions.length + 1, description, amount: parseFloat(amount) },
        ]);
        setDescription('');
        setAmount('');
    };

    return (
        <div>
            <h2>Transactions</h2>
            <form onSubmit={handleAddTransaction}>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                />
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    required
                />
                <button type="submit">Add Transaction</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h3>All Transactions</h3>
            {/* Use TransactionList component here */}
            <TransactionList transactions={transactions} />
        </div>
    );
};

export default Transactions;

