import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import {
  Authenticator,
  SignIn,
  RequireNewPassword,
  VerifyContact,
  ForgotPassword,
} from "aws-amplify-react-native";

import {
  HOME_SCREEN,
  RESULTS_SCREEN,
  SCAN_SCREEN,
  SETTINGS_SCREEN,
} from "./constants";
import ResultsView from "./src/ResultsView";
import ScanView from "./src/ScanView";
import SettingsView from "./src/SettingsView";
import AmplifyTheme from "aws-amplify-react-native/dist/AmplifyTheme";

import MySignUp from "./authComponents/MySignUp";

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

const GREEN_BLUE = "#0faa9a";

let theme = {
  ...AmplifyTheme,
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
    color: GREEN_BLUE,
  },
  sectionContent: {},
  buttonDisabled: {
    ...AmplifyTheme.buttonDisabled,
    backgroundColor: GREEN_BLUE,
  },
  container: {
    ...AmplifyTheme.container,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  button: {
    ...AmplifyTheme.button,
    backgroundColor: GREEN_BLUE,
  },
};

class AppComponents extends React.Component {
  constructor(props) {
    super(props);
    this._validAuthStates = ["signedIn"];
  }

  render() {
    if (this.props.authState === "signedIn") {
      return (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name={HOME_SCREEN} component={Home} />
            <Tab.Screen name={SETTINGS_SCREEN} component={SettingsView} />
          </Tab.Navigator>
        </NavigationContainer>
      );
    }
    return null;
  }
}

const App = () => {
  return <CustomAuthenticator />;
};

const CustomAuthenticator = () => {
  return (
    <Authenticator
      usernameAttributes="email"
      hideDefault={true}
      authState="signIn"
      theme={theme}
    >
      <SignIn />
      <ForgotPassword />
      <RequireNewPassword />
      <VerifyContact />
      <MySignUp override={"SignUp"} />
      <AppComponents />
    </Authenticator>
  );
};

export default App;
