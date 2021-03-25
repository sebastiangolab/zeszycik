import React, { useState, useContext } from 'react';
import DebtsContext from './DebtsContext';
import SortContext from './SortContext';

const SortState = props => {

    const debtsContext = useContext(DebtsContext);
    const debtsTab = debtsContext.debts;
    const setDebts = debtsContext.setDebts;

    const [selectSortValue, setSelectSortValue] = useState('alphabeticallySort');

    const alphabeticallySort = () => {
        debtsTab.sort((a, b) => (a.name > b.name) ? 1 : -1)
        setDebts(debtsTab);
        setSelectSortValue('alphabeticallySort');
    }

    const priceAscending = () => {
        debtsTab.sort((a, b) => (a.price > b.price) ? 1 : (a.price === b.price) ? ((a.name > b.name) ? 1 : -1) : -1)
        setDebts(debtsTab);
        setSelectSortValue('priceAscending');
    }

    const priceDescending = () => {
        debtsTab.sort((a, b) => (a.price < b.price) ? 1 : (a.price === b.price) ? ((a.name > b.name) ? 1 : -1) : -1)
        setDebts(debtsTab);
        setSelectSortValue('priceDescending');
    }

    return (
        <SortContext.Provider
            value={{
                selectSortValue: selectSortValue,
                setSortValue: setSelectSortValue,
                alphabeticallySort: alphabeticallySort,
                priceAscending: priceAscending,
                priceDescending: priceDescending
            }}
        >
            {props.children}
        </SortContext.Provider>
    );
}

export default SortState;