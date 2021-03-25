import * as React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import EditDebtForm from '../components/EditDebtForm';

import ScreenContainer from '../components/global/ScreenContainer';

const EditDebt = ({ route, navigation }) => {
  const { debtID } = route.params;

  return (
    <ScreenContainer nav={navigation}>
      <ScrollView>
        <View style={{ padding: 15 }}>
          <EditDebtForm navigation={navigation} debtID={debtID} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default EditDebt;