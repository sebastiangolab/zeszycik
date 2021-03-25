import * as React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Statistics from '../components/Statistics';

import ScreenContainer from '../components/global/ScreenContainer';

const StatisticsScreen = ({ navigation }) => {
    return (
      <ScreenContainer nav={navigation}>
        <ScrollView>
          <View style={{ padding: 15 }}>
            <Statistics />
          </View>
        </ScrollView>
      </ScreenContainer>
    );
};

export default StatisticsScreen;