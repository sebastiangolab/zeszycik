import 'react-native-gesture-handler';
import React, { useContext, useState } from 'react';
import { Formik } from 'formik';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import AddDebtFormValidation from './validations/AddDebtFormValidation';

import DebtsContext from '../components/global/DebtsContext';

function AddDebtForm({ navigation }) {

    //focused state
    const [newNameDebtFocused, newNameDebtFocus] = useState(false);
    const [newValueDebtFocused, newValueDebtFocus] = useState(false);

    //debts context 
    const debtsContext = useContext(DebtsContext);
    const debtsTab = debtsContext.debts;
    const setDebts = debtsContext.setDebts;
    const setAsyncStorage = debtsContext.setAsyncStorage;

    //create current date
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = dd + '.' + mm + '.' + yyyy;


    //function to add new debt
    const addNewDebt = (newNameDebt, newValueDebt) => {
      let mark;
      let duplicateName = false;
      
      //check duplicate name
      debtsTab.forEach(debt => {
        if (debt.name == newNameDebt) {
          duplicateName = true;
        }
      });


      if (duplicateName == false) {

        newValueDebt = parseFloat(newValueDebt);

        //set debt mark
        if (newValueDebt > 0) {
          mark = '+';
        } else if (newValueDebt < 0) {
          mark = '0';
        } else {
          mark = '';
        }

        //create new debt object
        const newDebtObject = {
          id: debtsContext.debtIndex + 1,
          name: newNameDebt,
          price: newValueDebt,
          history: [
            {
              date: today,
              mark: mark,
              price: newValueDebt,
              description: ''
            }
          ],
          visibleOptions: false,
        }

        //add object to debtsTab and set state
        console.log(debtsTab);

        debtsTab.unshift(newDebtObject);
        setDebts(debtsTab);  

        debtsContext.debts;
        // add 1 to index
        debtsContext.setDebtIndex(debtsContext.debtIndex + 1);

        //set Async Store
        setAsyncStorage(debtsTab);

        //back to HomeScreen
        navigation.navigate('HomeScreen');  
        
      } else {
        alert('Dłużnik o takiej nazwie już istnieje!');
      }
    }

    return (
    <Formik 
        initialValues={{newNameDebt:'', newValueDebt:''}}
        validationSchema={AddDebtFormValidation}
        onSubmit={(values) => addNewDebt(values.newNameDebt, values.newValueDebt)}
    >
      {({ values, handleChange, errors, setFieldTouched, touched, handleSubmit })=>(
        <View>

          <Text style={styles.inputLabel}>Imię i nazwisko</Text>
          <TextInput
            onFocus={() => newNameDebtFocus(true)}
            onBlur={() => { setFieldTouched('newNameDebt'); newNameDebtFocus(false) }}
            style={[styles.input, newNameDebtFocused ? styles.inputFocused : {}]}
            value={values.newNameDebt}
            onChangeText={handleChange('newNameDebt')}
            returnKeyType='done'
            returnKeyLabel='done'
          />
          {touched.newNameDebt && errors.newNameDebt &&
            <Text style={styles.errorLabel}>{errors.newNameDebt}</Text>
          }

          <Text style={styles.inputLabel}>Wartość długu (zł)</Text>
          <TextInput
            onFocus={() => newValueDebtFocus(true)}
            onBlur={() => { setFieldTouched('newValueDebt'); newValueDebtFocus(false); }}
            style={[styles.input, newValueDebtFocused ? styles.inputFocused : {}]}
            keyboardType="numeric"
            value={values.newValueDebt.replace(',', '.')}
            onChangeText={handleChange('newValueDebt')}
            returnKeyType='done'
            returnKeyLabel='done'
          />
          {touched.newValueDebt && errors.newValueDebt && errors.newValueDebt == 'Pole jest wymagane' &&
            <Text style={styles.errorLabel}>{errors.newValueDebt}</Text>
          }
          {touched.newValueDebt && errors.newValueDebt && errors.newValueDebt != 'Pole jest wymagane' &&
            <Text style={styles.errorLabel}>Nieprawidłowa cena</Text>
          }
          
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text 
            style={styles.buttonText}
          >
            Dodaj
          </Text>
        </TouchableOpacity>
        </View>
      )}
    </Formik>
    );
};

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: 13,
    marginBottom: 10,
  },

  input: {
    paddingTop: 13,
    paddingBottom: 13,
    paddingLeft: 14,
    paddingRight: 14,
    marginBottom: 25,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  inputFocused: {
    borderWidth: 1,
    borderColor: '#E2395F',
    paddingTop: 12,
    paddingBottom: 12,
  },

  errorLabel: {
    fontSize: 13,
    color: 'red',
    marginTop: -17,
    marginBottom: 22,
  },

  button: {
    backgroundColor: '#E2395F',
    borderRadius: 5,
    fontSize: 13,
    width: '100%',
    padding: 14,
  },

  buttonText: {
    textAlign: 'center',
    borderRadius: 5,
    color: '#fff',
  },

});

export default AddDebtForm;