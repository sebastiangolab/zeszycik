import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SortContext from '../components/global/SortContext';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/AntDesign';

const SortSelect = ({ reset }) => {

    const sortContext = useContext(SortContext);
    const selectSortValue = sortContext.selectSortValue;
    const setSortValue = sortContext.setSortValue;

    const changeSort = value => {
        if (value == 'alphabeticallySort') {

            sortContext.alphabeticallySort();
            setSortValue('alphabeticallySort');
            reset(Date(Date.now()).toString());

        } else if (value == 'priceAscending') {

            sortContext.priceAscending();
            setSortValue('priceAscending');
            reset(Date(Date.now()).toString());

        } else if (value == 'priceDescending') {

            sortContext.priceDescending();
            setSortValue('priceDescending');
            reset(Date(Date.now()).toString());

        }
    }

    return (
        <View>
            <RNPickerSelect
                style={customPickerStyles}
                value={selectSortValue}
                placeholder={{}}
                onValueChange={(value) => { changeSort(value); }}
                useNativeAndroidPickerStyle={false}
                items={[
                  { label: "Sortowanie: Alfabetyczne", value: "alphabeticallySort" },
                  { label: "Sortowanie: wg. długu rosnąco", value: "priceAscending" },
                  { label: "Sortowanie: wg. długu malejąco", value: "priceDescending" },
                ]}
                Icon={() => {
                  return <Icon style={customPickerStyles.icon} name="down"/>;
                }}
             />

        </View>
    )
   
}

const customPickerStyles = StyleSheet.create({
    inputIOS: {
        paddingTop: 13,
        paddingBottom: 13,
        paddingLeft: 14,
        paddingRight: 14,
        marginBottom: 17,
        borderRadius: 5,
        backgroundColor: '#E2395F',
        color: '#fff',
        fontSize: 16,
    },
  
    inputAndroid: {
        paddingTop: 13,
        paddingBottom: 13,
        paddingLeft: 14,
        paddingRight: 14,
        marginBottom: 17,
        borderRadius: 5,
        backgroundColor: '#E2395F',
        color: '#fff',
        fontSize: 16,
    },
  
    iconContainer: {
        top: 16,
        right: 12,
    },
  
    icon: {
        fontSize: 16,
        color: '#fff',
    }
});
  

export default SortSelect;