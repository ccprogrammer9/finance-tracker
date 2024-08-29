import React, { useState, useEffect } from 'react';
import '../App.css'; // Ensure correct path to CSS

const RepaymentPlans = ({ debts }) => {
    const [repayments, setRepayments] = useState([]);

    useEffect(() => {
        // Create repayment plans based on debts
        const newRepayments = debts.map(debt => ({
            id: debt.id,
            description: debt.description,
            totalAmount: debt.amountOwed,
            remainingAmount: debt.amountOwed,
            payments: []
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

    return (
        <div className="repayment-plans-container">
            <h2>Repayment Plans</h2>
            {repayments.length > 0 ? (
                <ul className="repayment-list">
                    {repayments.map((repayment) => (
                        <li key={repayment.id}>
                            {repayment.description} - Total Amount: ${repayment.totalAmount.toFixed(2)}, Remaining: ${repayment.remainingAmount.toFixed(2)}
                            <div>
                                <button onClick={() => {
                                    const amount = parseFloat(prompt('Enter payment amount:'));
                                    if (!isNaN(amount) && amount > 0) {
                                        handleAddPayment(repayment.id, amount);
                                    }
                                }}>
                                    Add Payment
                                </button>
                            </div>
                            <ul>
                                {repayment.payments.map((payment, index) => (
                                    <li key={index}>Payment: ${payment.toFixed(2)}</li>
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

export default RepaymentPlans;

