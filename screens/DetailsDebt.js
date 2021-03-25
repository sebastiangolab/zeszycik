import * as React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DetailsDebtList from '../components/DetailsDebtList';

import ScreenContainer from '../components/global/ScreenContainer';

const DetailsDebt = ({ route, navigation }) => {
  const { debtID } = route.params;

  return (
    <ScreenContainer nav={navigation}>
      <ScrollView>
        <View style={{ padding: 15 }}>
          <DetailsDebtList debtID={debtID} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default DetailsDebt;