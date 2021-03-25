import 'react-native-gesture-handler';
import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FAB } from 'react-native-paper';
import DebtsContext from '../components/global/DebtsContext';

import ScreenContainer from '../components/global/ScreenContainer';
import ListDebts from '../components/ListDebts';
import SortSelect from '../components/SortSelect';

function HomeScreen({ navigation }) {

  const [dateState, reset] = useState(Date(Date.now()).toString());

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
          <SortSelect reset={reset} />
          <ListDebts navigation={navigation} searchText={''} />
        </View>
      </ScrollView>
      <View style={styles.fabContainer}>
        <FAB
          style = {styles.fab}
          small = {true}
          uppercase = {false}
          icon = 'plus'
          label = 'Dodaj dłużnika'
          onPress = {() => { navigation.navigate('AddDebt') }}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  fab:{
    backgroundColor: '#E2395F',
    maxWidth: 200,
    padding: 3,
    marginTop: 5,
    marginBottom: 20,
    marginRight: 15,
    shadowOpacity: 0,
  },

  fabContainer: {
    backgroundColor: '#F9F9F9',
    display: 'flex',
    alignItems: 'flex-end',
  },

  paddingView: {
    padding: 15,
  }
});

export default HomeScreen;