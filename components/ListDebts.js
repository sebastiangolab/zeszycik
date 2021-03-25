import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import DebtsContext from './global/DebtsContext';
import SortContext from '../components/global/SortContext';

const ListDebts = ({ navigation, searchText = '' }) => {

  const [resetState, resetIndex] = useState(0);

  const debtsContext = useContext(DebtsContext);
  const debtsTab = debtsContext.debts;
  const setDebts = debtsContext.setDebts;
  const sortContext = useContext(SortContext);

  useEffect(() => {
    if (sortContext.selectSortValue == 'alphabeticallySort') {
      sortContext.alphabeticallySort();
    } else if (sortContext.selectSortValue == 'priceAscending') {
        sortContext.priceAscending();
    } else if (sortContext.selectSortValue == 'priceDescending') {
        sortContext.priceDescending();
    }  
  }, [sortContext.selectSortValue])
  
  //function to toggle visible debt options
  const toggleVisibleDebtOptions = (debtID) => {
    debtsTab.forEach(debt => {
      if (debt.id == debtID) {
        debt.visibleOptions = !debt.visibleOptions;
      } else {
        debt.visibleOptions = false;
      }
    });
    
    setDebts(debtsTab);
    resetIndex(resetState + 1);
  }

  let notes = [];

  debtsContext.debts.map(note => {
    //if have dot round the number
    if (note.price.toString().includes('.')){
      note.price = parseFloat(note.price).toFixed(2);
    } else {
      note.price = parseFloat(note.price);
    }

    let tempItem = (
      <View key={note.id + 1}>
        <TouchableOpacity style = {styles.debtor} onPress={() => { toggleVisibleDebtOptions(note.id); }}>
          <Text style={styles.debtorText}>{note.name}</Text>
          <Text style={styles.debtorPrice}>{note.price} zł</Text>
          {note.visibleOptions 
            ? <Icon style={styles.iconUp} name="up" />
            : <Icon style={styles.iconDown} name="down"/>
          }
          
          {note.visibleOptions == true &&
            <View style = {styles.debtOptions}>
              <TouchableOpacity style = {styles.buttonContainer} onPress={() => navigation.navigate('DetailsDebt', {debtID: note.id})}>
                <Text style = {styles.button}>Szczegóły</Text>
              </TouchableOpacity>

              <TouchableOpacity style = {styles.buttonContainer} onPress={() => navigation.navigate('EditDebt', {debtID: note.id})}>
                <Text style = {styles.button}>Edytuj</Text>
              </TouchableOpacity>

              <TouchableOpacity style = {styles.buttonContainer} onPress={() => navigation.navigate('DeleteDebt', {debtID: note.id})}>
                <Text style = {styles.button}>Usuń</Text>
              </TouchableOpacity>
            </View>
          }
        </TouchableOpacity>
      </View>
    );

    if (searchText == '' || note.name.toLowerCase().includes(searchText.toLowerCase())) {
      notes.push(tempItem);
    }
  });

  if (notes.length == 0) {
    notes.push(<Text key={0} style={styles.noDebtsText}>Nie masz żadnych dłużników</Text>);
  } 

  return (
    <View>
      {notes}
    </View>
  );
};

const styles = StyleSheet.create({
  debtor: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingTop: 13,
    paddingBottom: 13,
    paddingLeft: 15,
    paddingRight: 12,
    marginBottom: 17,
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

  debtorText: {
    width: '50%',
  },

  debtorPrice: {
    flex: 1,
    textAlign: 'right',
    paddingRight: '15%',
  },

  iconDown: {
    fontSize: 16,
    paddingTop: 5,
  },

  iconUp: {
    fontSize: 16,
    paddingTop: 5,
  },

  debtOptions: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  buttonContainer: {
    borderRadius: 5,
    backgroundColor: '#E2395F',
    marginTop: 20,
  },

  button: {
    color: '#fff',
    fontSize: 13,
    minWidth: 80,
    padding: 10,
    textAlign: 'center',
  },

  noDebtsText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 17,
  }

});

export default ListDebts;