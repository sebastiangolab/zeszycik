import 'react-native-gesture-handler';
import React from 'react';
import { TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import IconF from 'react-native-vector-icons/Feather';
import IconA from 'react-native-vector-icons/AntDesign';

const Menu = ({nav}) => {
    return (
      <SafeAreaView style={styles.menuContainer} >
          <TouchableOpacity style={styles.menuBtn} onPress={() => nav.navigate('HomeScreen') }>
            <IconF style={styles.menuIcons} name="home" />
          </TouchableOpacity >

          <TouchableOpacity style={styles.menuBtn} onPress={() => nav.navigate('SearchDebts') }>
            <IconF style={styles.menuIcons} name="search" />
          </TouchableOpacity >

          <TouchableOpacity style={styles.menuBtn} onPress={() => nav.navigate('StatisticsScreen') }>
            <IconA style={styles.menuIcons} name="barschart" />
          </TouchableOpacity >

          <TouchableOpacity style={styles.menuBtn} onPress={() => nav.navigate('About') }>
            <IconF style={styles.menuIcons} name="help-circle" />
          </TouchableOpacity >
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    menuContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: '#E2395F',
        alignItems: 'center'
    },

    menuBtn: {
        flexBasis: '25%',
        paddingTop: 15,
        paddingBottom: 12,
        display: 'flex',
        alignItems: 'center',
    },

    menuIcons: {
        color: '#fff',
        fontSize: 21,
        fontWeight: '700',
    },
});

export default Menu;