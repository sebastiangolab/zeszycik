import React from 'react';

export default React.createContext({
    selectSortValue: '',
    setSortValue: value => {},
    alphabeticallySort: debtsTab => {},
    priceAscending: debtsTab => {},
    priceDescending: debtsTab => {},
})