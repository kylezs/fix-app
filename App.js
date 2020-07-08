import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import ResultsView from "./src/ResultsView";
import ScanView from "./src/ScanView";

import {
  SCAN_SCREEN,
  RESULTS_SCREEN,
  SETTINGS_SCREEN,
  HOME_SCREEN,
} from "./constants";
import SettingsView from "./src/SettingsView";

// Contain the scan screen and results screen
const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={SCAN_SCREEN} component={ScanView} />
      <Stack.Screen name={RESULTS_SCREEN} component={ResultsView} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name={HOME_SCREEN} component={Home} />
        <Tab.Screen name={SETTINGS_SCREEN} component={SettingsView} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
