import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

// SCREENS
import HomeScreen from './screens/HomeScreen';
import StatisticsScreen from './screens/StatisticsScreen';
import About from './screens/About';
import EditDebt from './screens/EditDebt';
import AddDebt from './screens/AddDebt';
import DeleteDebt from './screens/DeleteDebt';
import DetailsDebt from './screens/DetailsDebt';
import SearchDebts from './screens/SearchDebts';

// STATES CONTEXT
import SortState from './components/global/SortState';
import GlobalDebtsState from './components/global/GlobalDebtsState';

const Stack = createStackNavigator();

const App = () => {
  return (
    <GlobalDebtsState>
      <SortState>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="HomeScreen"
            headerMode="screen"
            screenOptions={{
              headerStyle: { backgroundColor: '#E2395F' },
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              headerTitleStyle: { color: '#fff', fontSize: 23, fontWeight: '400' },
              headerLeftContainerStyle: { display: 'none' },
              cardStyleInterpolator: CardStyleInterpolators.forNoAnimation
            }}
          >

            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                title: 'Zeszycik',
              }}
              
            />

            <Stack.Screen
              name="AddDebt"
              component={AddDebt}
              options={{
                title: 'Dodaj dłuznika',
              }}
            />

            <Stack.Screen
              name="DeleteDebt"
              component={DeleteDebt}
              options={{
                title: 'Usuń dluznika',
              }}
            />

            <Stack.Screen
              name="EditDebt"
              component={EditDebt}
              options={{
                title: 'Edycja długu',
              }}
            />

            <Stack.Screen
              name="DetailsDebt"
              component={DetailsDebt}
              options={{
                title: 'Szczegóły dłuznika',
              }}
            />

            <Stack.Screen
              name="SearchDebts"
              component={SearchDebts}
              options={{
                title: 'Szukaj',
              }}
            />

            <Stack.Screen
              name="StatisticsScreen"
              component={StatisticsScreen}
              options={{
                title: 'Statystyki',
              }}
            />

            <Stack.Screen
              name="About"
              component={About}
              options={{
                title: 'O aplikacji',
              }}
            />

          </Stack.Navigator>
        </NavigationContainer>
      </SortState>
    </GlobalDebtsState>
  );
};


export default App;