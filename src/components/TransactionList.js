// src/components/TransactionList.js
import React from 'react';

const TransactionList = React.memo(({ transactions }) => {
    console.log('Rendering TransactionList'); // To check when re-renders occur
    return (
        <ul>
            {transactions.map((txn) => (
                <li key={txn.id}>
                    {txn.description}: ${txn.amount}
                </li>
            ))}
        </ul>
    );
});

export default TransactionList;
