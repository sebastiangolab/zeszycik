import React, { useState, useEffect } from 'react';
import DebtsContext from './DebtsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

const GlobalDebtsState = props => {

    const [debtsState, setDebtsState] = useState([]);
    const [debtIndex, setdebtIndex] = useState(0);

    const getAsyncStorage = async () => {
        try {
            const asyncStorageData = await AsyncStorage.getItem('debtsStore');
            if (asyncStorageData != null) {
                let jsonData = JSON.parse(asyncStorageData);
                let actualDebtIndex = 0;

                // set new id in tab
                jsonData.forEach(debt => {
                    debt.id = actualDebtIndex++;
                });

                setdebtIndex(actualDebtIndex);
                setDebtsState(jsonData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAsyncStorage();
        setTimeout(() => SplashScreen.hideAsync(), 3000);
    }, [])

    const setAsyncStorage = async newDebts => {
        try {
            await AsyncStorage.setItem('debtsStore', JSON.stringify(newDebts));
        } catch (error) {
            console.log(error.message);
        }
    }

    const resetDebtsOptions = () => {
        const debtsTab = debtsState;

        debtsTab.forEach(debt => {
            debt.visibleOptions = false;
        });
      
        setDebtsState(debtsTab);
    }
    
    return (
        <DebtsContext.Provider
            value={{
                debts: debtsState,
                debtIndex: debtIndex,
                setDebtIndex: setdebtIndex,
                setDebts: setDebtsState,
                setAsyncStorage: setAsyncStorage,
                resetDebtsOptions: resetDebtsOptions,
            }}
        >
            {props.children}
        </DebtsContext.Provider>
    );
}

export default GlobalDebtsState;