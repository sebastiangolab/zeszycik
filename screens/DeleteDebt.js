import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DebtsContext from '../components/global/DebtsContext';

import ScreenContainer from '../components/global/ScreenContainer';

const AddDebt = ({ route, navigation }) => {
  const { debtID } = route.params;

  const debtsContext = useContext(DebtsContext);
  let debtsTab = debtsContext.debts;

  const editableDebt = debtsTab.find(el => el.id == debtID);
  const editableDebtIndex = debtsTab.indexOf(editableDebt);

  const deleteDebt = () => {
    debtsTab.splice(editableDebtIndex, 1);
    debtsContext.setDebts(debtsTab);
    debtsContext.setAsyncStorage(debtsTab);

    navigation.navigate('HomeScreen');
  }

  return (
    <ScreenContainer nav={navigation}>
      <ScrollView>
        <View style={{ padding: 15 }}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Czy na pewno chcesz usunąć dłuznika "{editableDebt.name}" razem z całą jego historią?</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => { deleteDebt(); }}>
            <Text style={styles.buttonText}>Usuń</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    borderRadius: 5,
    backgroundColor: '#fff',
    padding: 14,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  text: {
    lineHeight: 24,
  },

  button: {
    backgroundColor: '#E2395F',
    borderRadius: 5,
    fontSize: 13,
    width: '100%',
    padding: 14,
    marginTop: 10,
  },

  buttonText: {
    textAlign: 'center',
    borderRadius: 5,
    color: '#fff',
  },
});

export default AddDebt;