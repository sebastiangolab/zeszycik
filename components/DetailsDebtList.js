import React, { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import DebtsContext from './global/DebtsContext';

const DetailsDebtList = ({ debtID }) => {

  const debtsContext = useContext(DebtsContext);
  const debtsTab = debtsContext.debts;

  const selectDebt = debtsTab.find(el => el.id == debtID);
  console.log(selectDebt);

  let details = [];
  let index = 1;

  selectDebt.history.map(detail => {
    //if have dot round the number
    if (detail.price.toString().includes('.')){
      detail.price = parseFloat(detail.price).toFixed(2);
    } else {
      detail.price = parseFloat(detail.price);
    }

    const tempItem = (
      <View key={index++} style={styles.detail}>
        <Text style={styles.date}>{detail.date}</Text>
        <Text style={styles.price}><Text style={styles.mark}>{detail.mark}</Text> {detail.price} zł</Text>
        {detail.description != '' &&
          <View style={styles.descriptionContainer}>
            <View style={styles.descriptionLine} />
            <Text style={styles.description}>Opis: {detail.description}</Text>
          </View>
        }
      </View>
    );

    details.push(tempItem);
  });
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>{selectDebt.name}</Text>
        <Text style={styles.text}>{selectDebt.price} zł</Text>
      </View>
      {details}
    </View>
  );
};

const styles = StyleSheet.create({
  detail: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    marginTop: 10,
    marginBottom: 8,
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

  header: {
    display: 'flex',
    alignItems: 'center',
    padding: 14,
    marginBottom: 8,
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

  mark: {
    color: '#f5195c',
  },

  date: {
    width: '65%',
    textAlign: 'left',
  },

  price: {
    width: '35%',
  },

  descriptionContainer: {
    width: '100%',
  },

  descriptionLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
    paddingTop: 10,
  },

  description: {
    width: '100%',
    paddingTop: 10,
    fontWeight: '300',
    fontSize: 13,
    lineHeight: 20,
  },

});

export default DetailsDebtList;