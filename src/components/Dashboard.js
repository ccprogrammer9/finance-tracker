// src/components/Dashboard.js
// Add functionality to display key financial metrics like total balance and recent transactions.
import React from 'react';

const Dashboard = () => {
    // Example data
    const totalBalance = 5000; // Replace with dynamic data later
    const recentTransactions = [
        { id: 1, description: 'Salary', amount: 1500 },
        { id: 2, description: 'Grocery', amount: -200 },
        { id: 3, description: 'Rent', amount: -1000 },
    ];

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Total Balance: ${totalBalance}</p>
            <h3>Recent Transactions</h3>
            <ul>
                {recentTransactions.map((txn) => (
                    <li key={txn.id}>
                        {txn.description}: ${txn.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
