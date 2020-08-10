import React, { useContext, useEffect } from 'react';

import { GlobalContext } from '../context/GlobalState';
import { Transaction } from './Transaction';

export const TransactionList = () => {
    // const context = useContext(GlobalContext);
    // console.log(context.transactions);
    const { transactions, getTransactions } = useContext(GlobalContext);
    // console.log(transactions);

    useEffect(() => {
        getTransactions();
    }, []);

    return (
        <>
            <h3>History</h3>
            <ul className="list">
                {transactions.map(transaction => (
                    <Transaction
                        key={transaction.id}
                        tra={transaction}
                    />
                ))}
            </ul>
        </>
    )
}
