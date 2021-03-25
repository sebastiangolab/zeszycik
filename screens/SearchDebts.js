import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ListDebts from '../components/ListDebts';
import DebtsContext from '../components/global/DebtsContext';

import ScreenContainer from '../components/global/ScreenContainer';

const SettingsScreen = ({ navigation }) => {

  const [dateState, reset] = useState(Date(Date.now()).toString());
  const [searchText, setSearchText] = useState('');
  const [isFocused, setFocused] = useState(false);

  const debtsContext = useContext(DebtsContext);
  debtsContext.resetDebtsOptions();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      reset(Date(Date.now()).toString());
    });
    return unsubscribe;
  }, [navigation]);


  return (
    <ScreenContainer nav={navigation}>
      <ScrollView>
        <View style={styles.paddingView}>
          <Text style={styles.inputLabel}>Wpisz nazwę dłuznika</Text>
          <TextInput 
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={[styles.input, isFocused ? styles.inputFocused : {}]} 
            onChangeText={text => setSearchText(text)}
            returnKeyType='done'
            returnKeyLabel='done'
          ></TextInput>

          <ListDebts navigation={navigation} searchText={searchText} />
        </View>
      </ScrollView>
    </ScreenContainer>
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
    marginBottom: 30,
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
    borderColor: '#F5195C',
    paddingTop: 12,
    paddingBottom: 12,
  },
  
  paddingView: {
    padding: 15,
  }

});

export default SettingsScreen;