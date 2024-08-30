import React, { useState, useEffect } from 'react';
import '../App.css'; // Ensure correct path to CSS

const RepaymentPlans = ({ debts }) => {
    const [repayments, setRepayments] = useState([]);

    useEffect(() => {
        // Create repayment plans based on debts
        const newRepayments = debts.map(debt => ({
            id: debt.id,
            name: debt.debtName, // Debt name
            description: debt.description || '', // Default to empty string if description is not provided
            totalAmount: debt.amountOwed,
            remainingAmount: debt.amountOwed,
            payments: [] // Payments will include only the amount
        }));
        setRepayments(newRepayments);
    }, [debts]);

    const handleAddPayment = (id, amount) => {
        setRepayments(repayments.map(rep => {
            if (rep.id === id) {
                const newRemainingAmount = rep.remainingAmount - amount;
                return {
                    ...rep,
                    remainingAmount: newRemainingAmount < 0 ? 0 : newRemainingAmount,
                    payments: [...rep.payments, amount]
                };
            }
            return rep;
        }));
    };

    const handleEditPayment = (repaymentId, paymentIndex, newAmount) => {
        setRepayments(repayments.map(rep => {
            if (rep.id === repaymentId) {
                const updatedPayments = rep.payments.map((payment, index) =>
                    index === paymentIndex ? newAmount : payment
                );
                const updatedRemainingAmount = rep.totalAmount - updatedPayments.reduce((sum, p) => sum + p, 0);
                return {
                    ...rep,
                    remainingAmount: updatedRemainingAmount < 0 ? 0 : updatedRemainingAmount,
                    payments: updatedPayments
                };
            }
            return rep;
        }));
    };

    return (
        <div className="repayment-list">
            <h2>Repayment Plans</h2>
            {repayments.length > 0 ? (
                <ul className="form-container">
                    {repayments.map((repayment) => (
                        <li key={repayment.id}>
                            <strong>{repayment.name}</strong> - {repayment.description} - Total Amount: ${repayment.totalAmount.toFixed(2)}, Remaining: ${repayment.remainingAmount.toFixed(2)}
                            <div>
                                <button onClick={() => {
                                    const amount = parseFloat(prompt('Enter payment amount:'));
                                    if (!isNaN(amount) && amount > 0) {
                                        handleAddPayment(repayment.id, amount);
                                    } else {
                                        alert('Please enter a valid amount.');
                                    }
                                }}>
                                    Add Payment
                                </button>
                            </div>
                            <ul>
                                {repayment.payments.map((payment, index) => (
                                    <EditablePayment
                                        key={index}
                                        payment={payment}
                                        onSave={(newAmount) => handleEditPayment(repayment.id, index, newAmount)}
                                    />
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No repayment plans available.</p>
            )}
        </div>
    );
};

// Separate component for editable payment
const EditablePayment = ({ payment, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editAmount, setEditAmount] = useState(payment);

    const handleSave = () => {
        if (!isNaN(editAmount) && editAmount > 0) {
            onSave(parseFloat(editAmount));
            setIsEditing(false);
        } else {
            alert('Please enter a valid amount.');
        }
    };

    return (
        <li>
            {isEditing ? (
                <div>
                    <input
                        type="number"
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                        step="0.01"
                        placeholder="Amount"
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    Payment: ${payment.toFixed(2)}
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </div>
            )}
        </li>
    );
};

export default RepaymentPlans;
