import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import {
  Authenticator,
  SignIn,
  SignUp,
  RequireNewPassword,
  VerifyContact,
  ForgotPassword,
  Greetings,
} from "aws-amplify-react-native";
import { Auth } from "aws-amplify";
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

const AppComponents = ({ authState }) => {
  _validAuthStates = ["signedIn"];
  console.log("Here's the authState in App components: " + authState);
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name={HOME_SCREEN} component={Home} />
          <Tab.Screen name={SETTINGS_SCREEN} component={SettingsView} />
        </Tab.Navigator>
      </NavigationContainer>
      <Greetings />
    </>
  );
};

const App = () => {
  const user = Auth.currentAuthenticatedUser()
    .then((user) => {
      return user;
    })
    .catch((err) => console.log(err));
  if (user) {
    return <AppComponents />;
  } else {
    return <CustomAuthenticator />;
  }
};

class MySignUp extends SignUp {
  constructor(props) {
    super(props);
    this._validAuthStates = ["signUp"];
  }

  render() {
    console.log("My Sign Up");
    console.log(this.props);
    const { authState } = this.props;
    return (
      <View>
        <Text>You cannot use this app unless you are cool</Text>
        <Button title="Sign In" onPress={() => this.changeState("signIn")} />
      </View>
    );
  }
}

const CustomAuthenticator = () => {
  return (
    <Authenticator
      usernameAttributes="email"
      hideDefault={true}
      authState="signIn"
    >
      <SignIn />
      <ForgotPassword />
      <RequireNewPassword />
      <VerifyContact />
      <MySignUp override={"SignUp"} />
    </Authenticator>
  );
};

export default App;
