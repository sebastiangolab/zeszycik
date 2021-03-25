import 'react-native-gesture-handler';
import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import Menu from './Menu';

import { useHeaderHeight } from '@react-navigation/stack';

const getStyle = () => {
  const headerHeight = useHeaderHeight();
  
  let screenHeight = Dimensions.get("window").height;

  const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: '#F9F9F9',
      width: '100%',
      height: screenHeight,
    },

    appContainer: {
      position: 'relative',
      fontSize: 16,
      flex: 1,
      zIndex: -1
    },
  });

  return styles;
}

const ScreenContainer = props => {
    const styles = getStyle();

    return (
      <View style={styles.screenContainer}>
          <View style={styles.appContainer}>
            {props.children}
          </View>
          <Menu nav={props.nav} /> 
      </View>
    );
};

export default ScreenContainer;