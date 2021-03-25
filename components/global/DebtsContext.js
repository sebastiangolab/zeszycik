import React from 'react';

export default React.createContext({
    debts: [],
    debtIndex: 0,
    setDebtIndex: newIndex => {},
    setDebts: newDebts => {},
    setAsyncStore: newDebts => {},
    resetDebtsOptions: newDebts => {},
})