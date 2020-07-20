import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { Authenticator, SignIn } from "aws-amplify-react-native";
import { View, Text, Button } from "react-native";

import {
  HOME_SCREEN,
  RESULTS_SCREEN,
  SCAN_SCREEN,
  SETTINGS_SCREEN,
} from "./constants";
import ResultsView from "./src/ResultsView";
import ScanView from "./src/ScanView";
import SettingsView from "./src/SettingsView";
import { SignUp } from "aws-amplify-react-native/dist/Auth";

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

function App() {
  return (
    <CustomAuthenticator>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name={HOME_SCREEN} component={Home} />
          <Tab.Screen name={SETTINGS_SCREEN} component={SettingsView} />
        </Tab.Navigator>
      </NavigationContainer>
    </CustomAuthenticator>
  );
}

class MySignUp extends SignUp {
  constructor(props) {
    super(props);
    this._validAuthStates = ["signUp", "signedOut", "signedUp"];
  }

  render() {
    console.log(this.props);
    const { authState } = this.props;
    if (authState === "signUp") {
      return (
        <View>
          <Text>You cannot use this app unless you are cool</Text>
          <Button title="Sign In" onPress={() => this.changeState("signIn")} />
        </View>
      );
    }
    return null;
  }
}

const CustomAuthenticator = () => {
  return (
    <Authenticator usernameAttributes="email" hideDefault={true}>
      <SignIn />
      <MySignUp override={"SignUp"} />
    </Authenticator>
  );
};

export default App;
