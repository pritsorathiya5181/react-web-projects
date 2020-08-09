import React, { useContext } from 'react'

import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

export const Banner = () => {
    const { transactions } = useContext(GlobalContext);
    let balance = 0;
    transactions.map(tra =>
        balance += tra.amount
    );
    balance = balance.toFixed(2);
    return (
        <>
            <h4>Your Balance</h4>
            <h1 id="balance">${numberWithCommas(balance)}</h1>
        </>
    )
}
