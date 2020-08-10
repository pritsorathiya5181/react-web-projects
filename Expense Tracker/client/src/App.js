import './App.css'

import { AddTransaction } from './components/AddTransaction';
import { Banner } from './components/Balance';
import { GlobalProvider } from './context/GlobalState';
import { Header } from './components/Header';
import { IncomeExpense } from './components/IncomeExpense';
import React from 'react';
import { TransactionList } from './components/TransactionList';

function App() {
  return (
    <GlobalProvider>
      <Header />
      <div className="container">
        <Banner />
        <IncomeExpense />
        <TransactionList />
        <AddTransaction />
      </div>
    </GlobalProvider>
  );
}

export default App;
