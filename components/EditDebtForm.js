import React, { useContext, useState } from 'react';
import { Formik } from 'formik';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DebtsContext from './global/DebtsContext';
import EditDebtFormValidation from './validations/EditDebtFormValidation';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/AntDesign';

function EditDebtForm({ navigation, debtID }) {

    //focused state
    const [addValueFocused, addValueFocus] = useState(false);
    const [deleteValueFocused, deleteValueFocus] = useState(false);
    const [newValueNameFocused, newValueNameFocus] = useState(false);
    const [descriptionFocused, descriptionFocus] = useState(false);

    const debtsContext = useContext(DebtsContext);
    const debtsTab = debtsContext.debts;
    const setAsyncStorage = debtsContext.setAsyncStorage;

    const editableDebt = debtsTab.find(el => el.id == debtID);
    const editableDebtIndex = debtsTab.indexOf(editableDebt);

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    today = dd + '.' + mm + '.' + yyyy;

    const addDebt = (newValue, description) => {
      const historyDebt = {
        date: today,
        mark: '+',
        price: newValue,
        description: description
      };

      let nevValueFinal = parseFloat(debtsTab[editableDebtIndex].price) + parseFloat(newValue);

      debtsTab[editableDebtIndex].price = nevValueFinal;
      debtsTab[editableDebtIndex].history.unshift(historyDebt);

      debtsContext.setDebts(debtsTab);
      setAsyncStorage(debtsTab);

      navigation.navigate('HomeScreen');
    };

    const minusDebt = (newValue) => {
      const historyDebt = {
        date: today,
        mark: '-',
        price: newValue,
        description: '',
      };

      let nevValueFinal = parseFloat(debtsTab[editableDebtIndex].price) - parseFloat(newValue);

      debtsTab[editableDebtIndex].price = parseFloat(nevValueFinal);
      debtsTab[editableDebtIndex].history.unshift(historyDebt);

      debtsContext.setDebts(debtsTab);
      setAsyncStorage(debtsTab);

      navigation.navigate('HomeScreen');
    };

    const changeName = (newValue) => {
      debtsTab[editableDebtIndex].name = newValue;

      debtsContext.setDebts(debtsTab);
      setAsyncStorage(debtsTab);

      navigation.navigate('HomeScreen');
    };
  
    const editDebt = (option, addValue, deleteValue, newValueName, description) => {
      if (option == 'add') {
        addDebt(addValue, description);
      } else if (option == 'delete') {
        minusDebt(deleteValue);
      } else if (option == 'changeName') {
        changeName(newValueName);
      }
    };

    return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>{editableDebt.name}</Text>
        <Text style={styles.text}>{editableDebt.price} zł</Text>
      </View>

      <Formik
          initialValues={{option: 'add', addValue: '', deleteValue: '', newValueName: '', description: '', fieldShow: 'add' }}
          onSubmit={(values) => editDebt(values.option, values.addValue, values.deleteValue, values.newValueName, values.description)}
          validationSchema={EditDebtFormValidation}
      >
        {({ values, handleChange, errors, setFieldTouched, touched, handleSubmit, handleReset, setFieldValue }) => (
          <View>

            {/* select field */}
            <Text style={styles.inputLabel}>Co chesz zrobić?</Text>

            <RNPickerSelect
                style={customPickerStyles}
                value={values.option}
                placeholder={{}}
                onValueChange={(value) => {
                  handleReset();
                  setFieldValue('option', value); 
                  if (value == 'add') {
                    setFieldValue('fieldShow', 'add');
                  } else if (value == 'delete') {
                    setFieldValue('fieldShow', 'delete');
                  } else if (value == 'changeName') {
                    setFieldValue('fieldShow', 'changeName');
                  }
                }}
                useNativeAndroidPickerStyle={false}
                items={[
                  { label: "Dodać do długu", value: "add" },
                  { label: "Odjąć od długu", value: "delete" },
                  { label: "Zmienić nazwę", value: "changeName" },
                ]}
                Icon={() => {
                  return <Icon style={customPickerStyles.icon} name="down"/>;
                }}
             />


            {/* add value field with errors fields */}
            {values.option == 'add' &&
              <>
                <Text style={styles.inputLabel}>Podaj wartość (zł)</Text>
                <TextInput
                  onFocus={() => addValueFocus(true)}
                  onBlur={() => { setFieldTouched('addValue'); addValueFocus(false) }}
                  style={[styles.input, addValueFocused ? styles.inputFocused : {}]}
                  keyboardType="numeric"
                  value={values.addValue.replace(',', '.')}
                  onChangeText={handleChange('addValue')}
                  returnKeyType='done'
                  returnKeyLabel='done'
                />
              </>
            }

            {values.option == 'add' && touched.addValue && errors.addValue && errors.addValue == 'Pole jest wymagane' &&
              <Text style={styles.errorLabel}>{errors.addValue}</Text>
            }
            {values.option == 'add' && touched.addValue && errors.addValue && errors.addValue != 'Pole jest wymagane' &&
              <Text style={styles.errorLabel}>Nieprawidłowa cena</Text>
            }
            
            {/* delete value field with errors fields */}
            {values.option == 'delete' &&
              <>
                <Text style={styles.inputLabel}>Podaj wartość (zł)</Text>
                <TextInput
                  onFocus={() => deleteValueFocus(true)}
                  onBlur={() => { setFieldTouched('deleteValue'); deleteValueFocus(false) }}
                  style={[styles.input, deleteValueFocused ? styles.inputFocused : {}]}
                  keyboardType="numeric"
                  value={values.deleteValue.replace(',', '.')}
                  onChangeText={handleChange('deleteValue')}
                  returnKeyType='done'
                  returnKeyLabel='done'
                />
              </>
            }

            {values.option == 'delete' && touched.deleteValue && errors.deleteValue && errors.deleteValue == 'Pole jest wymagane' &&
              <Text style={styles.errorLabel}>{errors.deleteValue}</Text>
            }
            {values.option == 'delete' && touched.deleteValue && errors.deleteValue && errors.deleteValue != 'Pole jest wymagane' &&
              <Text style={styles.errorLabel}>Nieprawidłowa cena</Text>
            }

            {/* new name value field with errors fields */}
            {values.option == 'changeName' &&
            <>
              <Text style={styles.inputLabel}>Podaj nową nazwę</Text>
              <TextInput
                onFocus={() => newValueNameFocus(true)}
                onBlur={() => { setFieldTouched('newValueName'); newValueNameFocus(false) }}
                style={[styles.input, newValueNameFocused ? styles.inputFocused : {}]}
                value={values.newValueName}
                onChangeText={handleChange('newValueName')}
              />
            </>
            }

            {values.option == 'changeName' && touched.newValueName && errors.newValueName && errors.newValueName == 'Pole jest wymagane' &&
              <Text style={styles.errorLabel}>{errors.newValueName}</Text>
            }

            {/* optional description */}
            {values.option == 'add' &&
              <View>
                <Text style={styles.inputLabel}>Podaj opis (opcjonalnie)</Text>
                <TextInput
                  onFocus={() => descriptionFocus(true)}
                  onBlur={() => { setFieldTouched('description'); descriptionFocus(false); }}
                  style={[styles.input, descriptionFocused ? styles.inputFocused : {}]}
                  value={values.description}
                  onChangeText={handleChange('description')}
                  returnKeyType='done'
                  returnKeyLabel='done'
                />
              </View>
            }
            {values.option == 'add' && touched.description && errors.description &&
              <Text style={styles.errorLabel}>{errors.description}</Text>
            }

            {/* form submit */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text
                style={styles.buttonText}
              >
                Zapisz
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
    );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: 14,
    marginBottom: 25,
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

  title: {
    fontSize: 18,
  },

  text: {
    marginTop: 12,
    fontSize: 15,
    color: '#f5195c',
  },

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
    color: '#000',
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

const customPickerStyles = StyleSheet.create({
  inputIOS: {
    paddingTop: 13,
    paddingBottom: 13,
    paddingLeft: 14,
    paddingRight: 14,
    marginBottom: 25,
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#000',
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

  inputAndroid: {
    paddingTop: 13,
    paddingBottom: 13,
    paddingLeft: 14,
    paddingRight: 14,
    marginBottom: 25,
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#000',
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

  iconContainer: {
    top: 16,
    right: 12,
  },

  icon: {
    fontSize: 16,
  }
});

export default EditDebtForm;