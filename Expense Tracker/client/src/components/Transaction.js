import React, { useContext } from 'react';

import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

export const Transaction = ({ tra }) => {
    const { deleteTransaction } = useContext(GlobalContext);

    const sign = tra.amount < 0 ? '-' : '+';

    return (
        <li className={tra.amount < 0 ? "minus" : "plus"}>
            {tra.text} <span>{sign}${numberWithCommas(Math.abs(tra.amount))}</span>
            <button className="delete-btn" onClick={() => { deleteTransaction(tra._id) }}>x</button>
        </li>
    )
}
