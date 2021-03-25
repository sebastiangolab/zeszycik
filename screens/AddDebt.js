import * as React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import ScreenContainer from '../components/global/ScreenContainer';
import AddDebtForm from '../components/AddDebtForm';

const AddDebt = ({ navigation }) => {
  return (
    <ScreenContainer nav={navigation}>
      <ScrollView>
        <View style={{ padding: 15 }}>
          <AddDebtForm navigation={navigation} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default AddDebt;