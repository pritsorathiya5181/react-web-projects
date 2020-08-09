import React, { useContext } from 'react';

import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

export const IncomeExpense = () => {
    const { transactions } = useContext(GlobalContext);
    let income = 0;
    let expense = 0;
    transactions.map(tra => {
        if (tra.amount > 0) {
            income += tra.amount
        } else {
            expense += Math.abs(tra.amount)
        }
    })
    return (
        <div className="inc-exp-container">
            <div>
                <h4>Income</h4>
                <p className="money plus">${numberWithCommas(income.toFixed(2))}</p>
            </div>
            <div>
                <h4>Expense</h4>
                <p className="money minus">${numberWithCommas(expense.toFixed(2))}</p>
            </div>
        </div>

    )
}
