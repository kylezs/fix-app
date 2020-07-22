import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { GREEN_BLUE } from "./theme";

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

import MySignUp from "./src/authComponents/MySignUp";

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
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Home") {
                  iconName = "home";
                } else if (route.name === "Settings") {
                  iconName = "gear";
                }

                // You can return any component that you like here!
                return <Icon name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              inactiveTintColor: GREEN_BLUE,
              activeTintColor: "white",
              activeBackgroundColor: GREEN_BLUE,
              inactiveBackgroundColor: "white",
            }}
          >
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
      <AppComponents theme={theme} />
    </Authenticator>
  );
};

export default App;
