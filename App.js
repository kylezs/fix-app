import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import ResultsView from "./src/ResultsView";
import ScanView from "./src/ScanView";

import { SCAN_SCREEN, RESULTS_SCREEN } from "./constants";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={SCAN_SCREEN} component={ScanView} />
        <Stack.Screen name={RESULTS_SCREEN} component={ResultsView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
