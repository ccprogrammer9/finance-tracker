import React, { useState, useEffect } from 'react';
import '../App.css'; // Ensure this includes the updated form styles

const Budget = () => {
    const [budgets, setBudgets] = useState([]);
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const savedBudgets = JSON.parse(localStorage.getItem('budgets')) || [];
        setBudgets(savedBudgets);
    }, []);

    useEffect(() => {
        localStorage.setItem('budgets', JSON.stringify(budgets));
    }, [budgets]);

    const handleAddOrUpdateBudget = (e) => {
        e.preventDefault();
        if (!category || isNaN(amount) || amount <= 0) {
            setError('Please provide a valid category and amount.');
            return;
        }
        setError('');

        // Parse amount correctly
        const parsedAmount = parseFloat(amount);

        if (editingId) {
            // Update existing budget
            setBudgets(budgets.map(budget =>
                budget.id === editingId ? { ...budget, category, amount: parsedAmount } : budget
            ));
            setEditingId(null);
        } else {
            // Add new budget
            setBudgets([
                ...budgets,
                { id: budgets.length ? Math.max(budgets.map(b => b.id)) + 1 : 1, category, amount: parsedAmount },
            ]);
        }
        setCategory('');
        setAmount('');  // Clear amount field after adding/updating
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

    // Calculate total amount and format with commas
    const totalAmount = budgets.reduce((sum, budget) => sum + budget.amount, 0);
    const formattedTotalAmount = totalAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

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
                        onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}  // Allow only numbers and dot
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
                <>
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
                    <h4>Total Budget: {formattedTotalAmount}</h4>
                </>
            ) : (
                <p>No budgets added yet.</p>
            )}
        </div>
    );
};

export default Budget;
