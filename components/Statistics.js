import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DebtsContext from './global/DebtsContext';

const Statistics = () => {

    const debtsContext = useContext(DebtsContext);
    const debtsTab = debtsContext.debts;

    const currentBorrow = () => {
        let borrow = 0;

        debtsTab.forEach(debt => {
            borrow += parseFloat(debt.price);
        });

        //if have dot round the number
        if (borrow.toString().includes('.')){
            borrow = parseFloat(borrow).toFixed(2);
        } else {
            borrow = parseFloat(borrow);
        }

        return borrow;
    }

    const countDebts = () => {
        return debtsTab.length;
    }

    const mostDebt = () => {
        if (debtsTab.length) {
            let actualMostPrice = debtsTab[0].price;
            let actualMostDebt = debtsTab[0].name;

            debtsTab.forEach(debt => {
                if (debt.price > actualMostPrice) {
                    actualMostPrice = debt.price;
                    actualMostDebt = debt.name;
                }
            });

            return actualMostDebt;
        } else {
            return 'Brak dłużników'
        }
    }

    const leastDebt = () => {
        if (debtsTab.length) {
            let actualLeastPrice = debtsTab[0].price;
            let actualLeastDebt = debtsTab[0].name;

            debtsTab.forEach(debt => {
                if (debt.price < actualLeastPrice) {
                    actualLeastPrice = debt.price;
                    actualLeastDebt = debt.name;
                }
            });

            return actualLeastDebt;
        } else {
            return 'Brak dłużników'
        }
    }


    return (
        <View>
            <View style={styles.statisticBlock}>
                <Text style={styles.statisticTitle}>Aktualnie pożyczasz:</Text>
                <Text style={styles.statisticValue}>{currentBorrow()} zł</Text>
            </View>

            <View style={styles.statisticBlock}>
                <Text style={styles.statisticTitle}>Liczba dłużników:</Text>
                <Text style={styles.statisticValue}>{countDebts()}</Text>
            </View>

            <View style={styles.statisticBlock}>
                <Text style={styles.statisticTitle}>Najwięcej pożycza:</Text>
                <Text style={styles.statisticValue}>{mostDebt()}</Text>
            </View>

            <View style={styles.statisticBlock}>
                <Text style={styles.statisticTitle}>Najmniej pożycza:</Text>
                <Text style={styles.statisticValue}>{leastDebt()}</Text>
            </View>
        </View>
    )
   
}

const styles = StyleSheet.create({
    statisticBlock: {
        display: 'flex',
        alignItems: 'center',
        padding: 14,
        marginBottom: 18,
        borderRadius: 5,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
         width: 0,
            height: 1,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },

    statisticTitle: {
        fontSize: 14,
    },

    statisticValue: {
        fontSize: 20,
        color: '#f5195c',
        fontWeight: '600',
        marginTop: 12,
    }
});

export default Statistics;