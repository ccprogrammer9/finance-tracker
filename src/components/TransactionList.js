import React from 'react';

const TransactionList = ({ transactions, onEdit, onDelete }) => {
    return (
        <ul>
            {transactions.map((txn) => (
                <li key={txn.id}>
                    {txn.date} - {txn.description}: ${txn.amount} (Category: {txn.category})
                    <button onClick={() => onEdit(txn.id)}>Edit</button>
                    <button onClick={() => onDelete(txn.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default TransactionList;
