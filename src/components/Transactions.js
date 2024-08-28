import React, { useState, useEffect } from 'react';
import TransactionList from './TransactionList';
import '../App.css';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
        setTransactions(savedTransactions);
    }, []);

    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);

    const handleAddTransaction = (e) => {
        e.preventDefault();
        if (!description || isNaN(amount) || amount <= 0 || !category || !date) {
            setError('Please provide a valid description, amount, category, and date.');
            return;
        }
        setError('');
        if (editingId !== null) {
            setTransactions(transactions.map(txn =>
                txn.id === editingId
                    ? { ...txn, description, amount: parseFloat(amount), category, date }
                    : txn
            ));
            setEditingId(null);
        } else {
            setTransactions([
                ...transactions,
                { id: transactions.length ? Math.max(transactions.map(t => t.id)) + 1 : 1, description, amount: parseFloat(amount), category, date }
            ]);
        }
        setDescription('');
        setAmount('');
        setCategory('');
        setDate('');
    };

    const handleEditTransaction = (id) => {
        const txn = transactions.find(txn => txn.id === id);
        if (txn) {
            setDescription(txn.description);
            setAmount(txn.amount);
            setCategory(txn.category);
            setDate(txn.date);
            setEditingId(id);
        }
    };

    const handleDeleteTransaction = (id) => {
        setTransactions(transactions.filter(txn => txn.id !== id));
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Daily Expenses</h2>
            <form className="form-container" onSubmit={handleAddTransaction}>
                <div>
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Category"
                        required
                    />
                </div>
                <div className="full-width">
                    <button type="submit">
                        {editingId ? 'Update Expense' : 'Add Expense'}
                    </button>
                </div>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="transaction-list-container">
                <h2>Expense Log</h2>
                <TransactionList
                    transactions={transactions}
                    onEdit={handleEditTransaction}
                    onDelete={handleDeleteTransaction}
                />
            </div>
        </div>
    );
};

export default Transactions;
