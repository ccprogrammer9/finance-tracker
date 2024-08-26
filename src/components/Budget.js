// src/components/Budget.js
// Set up a basic structure to manage budgets for different categories.

import React, { useState, useEffect } from 'react';

const Budget = () => {
    const [budgets, setBudgets] = useState([]);
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const savedBudgets = JSON.parse(localStorage.getItem('budgets')) || [];
        setBudgets(savedBudgets);
    }, []);

    useEffect(() => {
        localStorage.setItem('budgets', JSON.stringify(budgets));
    }, [budgets]);

    const handleAddOrUpdateBudget = (e) => {
        e.preventDefault();
        if (editingId) {
            setBudgets(budgets.map(budget =>
                budget.id === editingId ? { ...budget, category, amount: parseFloat(amount) } : budget
            ));
            setEditingId(null);
        } else {
            setBudgets([
                ...budgets,
                { id: budgets.length + 1, category, amount: parseFloat(amount) },
            ]);
        }
        setCategory('');
        setAmount('');
    };

    const handleEdit = (id) => {
        const budget = budgets.find(budget => budget.id === id);
        setCategory(budget.category);
        setAmount(budget.amount);
        setEditingId(id);
    };

    const handleDelete = (id) => {
        setBudgets(budgets.filter(budget => budget.id !== id));
    };

    return (
        <div>
            <h2>Budget</h2>
            <form onSubmit={handleAddOrUpdateBudget}>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Category"
                    required
                />
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    required
                />
                <button type="submit">{editingId ? 'Update Budget' : 'Add Budget'}</button>
            </form>
            <h3>All Budgets</h3>
            <ul>
                {budgets.map((budget) => (
                    <li key={budget.id}>
                        {budget.category}: ${budget.amount}
                        <button onClick={() => handleEdit(budget.id)}>Edit</button>
                        <button onClick={() => handleDelete(budget.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Budget;
