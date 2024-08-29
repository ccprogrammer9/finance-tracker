import React, { useState, useEffect } from 'react';
import '../App.css'; // Ensure correct path to CSS

const DebtTracker = ({ debts, setDebts }) => {
    const [debtName, setDebtName] = useState('');
    const [amountOwed, setAmountOwed] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [paymentSchedule, setPaymentSchedule] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        // Save debts to local storage whenever debts state changes
        localStorage.setItem('debts', JSON.stringify(debts));
    }, [debts]);

    const handleAddOrUpdateDebt = (e) => {
        e.preventDefault();
        if (!debtName || isNaN(amountOwed) || amountOwed <= 0 || isNaN(interestRate) || interestRate < 0 || !paymentSchedule) {
            setError('Please provide valid debt details.');
            return;
        }
        setError('');
        if (editingId) {
            // Update existing debt
            setDebts(debts.map(debt =>
                debt.id === editingId ? { ...debt, debtName, amountOwed: parseFloat(amountOwed), interestRate: parseFloat(interestRate), paymentSchedule } : debt
            ));
            setEditingId(null);
        } else {
            // Add new debt
            setDebts([
                ...debts,
                { id: debts.length ? Math.max(debts.map(d => d.id)) + 1 : 1, debtName, amountOwed: parseFloat(amountOwed), interestRate: parseFloat(interestRate), paymentSchedule },
            ]);
        }
        setDebtName('');
        setAmountOwed('');
        setInterestRate('');
        setPaymentSchedule('');
    };

    const handleEdit = (id) => {
        // Set form fields for editing
        const debt = debts.find(debt => debt.id === id);
        setDebtName(debt.debtName);
        setAmountOwed(debt.amountOwed);
        setInterestRate(debt.interestRate);
        setPaymentSchedule(debt.paymentSchedule);
        setEditingId(id);
    };

    const handleDelete = (id) => {
        // Remove debt and update local storage
        setDebts(debts.filter(debt => debt.id !== id));
    };

    return (
        <div className="debt-tracker">
            <h2>Debt Tracker</h2>
            <form className="form-container" onSubmit={handleAddOrUpdateDebt}>
                <div>
                    <label htmlFor="debtName">Debt Name</label>
                    <input
                        type="text"
                        id="debtName"
                        value={debtName}
                        onChange={(e) => setDebtName(e.target.value)}
                        placeholder="Debt Name"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="amountOwed">Amount Owed</label>
                    <input
                        type="number"
                        id="amountOwed"
                        value={amountOwed}
                        onChange={(e) => setAmountOwed(e.target.value)}
                        placeholder="Amount Owed"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="interestRate">Interest Rate (%)</label>
                    <input
                        type="number"
                        id="interestRate"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        placeholder="Interest Rate"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="paymentSchedule">Due Date</label>
                    <input
                        type="text"
                        id="duedate"
                        value={paymentSchedule}
                        onChange={(e) => setPaymentSchedule(e.target.value)}
                        placeholder="Due Date"
                        required
                    />
                </div>
                <div className="full-width">
                    <button type="submit">{editingId ? 'Update Debt' : 'Add Debt'}</button>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
            <h3>Debt List</h3>
            {debts.length > 0 ? (
                <ul className="debt-list">
                    {debts.map((debt) => (
                        <li key={debt.id} className="debt-item">
                            <span>{debt.debtName} - ${debt.amountOwed.toFixed(2)} - {debt.interestRate}% - {debt.paymentSchedule}</span>
                            <div className="debt-actions">
                                <button onClick={() => handleEdit(debt.id)}>Edit</button>
                                <button onClick={() => handleDelete(debt.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No debts added yet.</p>
            )}
        </div>
    );
};

export default DebtTracker;

