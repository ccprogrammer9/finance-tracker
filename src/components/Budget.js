import React, { useState, useEffect } from 'react';
import '../App.css';

const Budget = () => {
    const [budgets, setBudgets] = useState([]);
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        // Load budgets from local storage on component mount
        const savedBudgets = JSON.parse(localStorage.getItem('budgets')) || [];
        setBudgets(savedBudgets);
    }, []);

    useEffect(() => {
        // Save budgets to local storage whenever budgets state changes
        localStorage.setItem('budgets', JSON.stringify(budgets));
    }, [budgets]);

    const handleAddOrUpdateBudget = (e) => {
        e.preventDefault();
        if (!category || isNaN(amount) || amount <= 0) {
            setError('Please provide a valid category and amount.');
            return;
        }
        setError('');
        if (editingId) {
            // Update existing budget
            setBudgets(budgets.map(budget =>
                budget.id === editingId ? { ...budget, category, amount: parseFloat(amount) } : budget
            ));
            setEditingId(null);
        } else {
            // Add new budget
            setBudgets([
                ...budgets,
                { id: budgets.length ? Math.max(budgets.map(b => b.id)) + 1 : 1, category, amount: parseFloat(amount) },
            ]);
        }
        setCategory('');
        setAmount('');
    };

    const handleEdit = (id) => {
        // Set form fields for editing
        const budget = budgets.find(budget => budget.id === id);
        setCategory(budget.category);
        setAmount(budget.amount);
        setEditingId(id);
    };

    const handleDelete = (id) => {
        // Remove budget and update local storage
        setBudgets(budgets.filter(budget => budget.id !== id));
    };

    return (
        <div className="main-content">
            <h2>Budget</h2>
            <form className="form-container" onSubmit={handleAddOrUpdateBudget}>
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
                <div className="full-width">
                    <button type="submit">{editingId ? 'Update Budget' : 'Add Budget'}</button>
                </div>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h3>Budget Categories</h3>
            {budgets.length > 0 ? (
                <ul className="budget-list">
                    {budgets.map((budget) => (
                        <li key={budget.id}>
                            {budget.category}: ${budget.amount.toFixed(2)}
                            <div>
                                <button onClick={() => handleEdit(budget.id)}>Edit</button>
                                <button onClick={() => handleDelete(budget.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No budgets added yet.</p>
            )}
        </div>
    );
};

export default Budget;

