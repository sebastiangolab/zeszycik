import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import ScreenContainer from '../components/global/ScreenContainer';

const About = ({ navigation }) => {
    return (
      <ScreenContainer nav={navigation}>
        <ScrollView>
          <View style={{ padding: 15 }}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Aplikacja Zeszycik</Text>
              <Text style={styles.text}>Wersja 1.0</Text>
              <Text style={styles.text}><Text style={styles.strong}>Autor:</Text> Sebastian Gołąb</Text>
              <Text style={styles.text}><Text style={styles.strong}>Mail:</Text> sebagolab97@gmail.com</Text>
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.textLeft}>Podziękowania dla Igora Gielasa (na snapie krulzloty) za pomysł na apke</Text>
            </View>
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
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 18,
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
    fontSize: 20,
    textAlign: 'center',
  },

  text: {
    textAlign: 'center',
    paddingTop: 10,
  },

  strong: {
    fontWeight: '600',
  },

  textLeft: {
    lineHeight: 22,
    fontSize: 13,
  }
});

export default About;