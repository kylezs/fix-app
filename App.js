import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import ResultsView from './src/ResultsView';
import ScanView from './src/ScanView'

const Stack = createStackNavigator();

export default function App() {
  return (<NavigationContainer><Stack.Navigator>
          <Stack.Screen name = 'Scan' component =
           {
             ScanView
           } />
    <Stack.Screen name='Results' component={
    ResultsView} />
          </Stack.Navigator>
  </NavigationContainer>);
}
