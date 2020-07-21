import React from "react";

import { SignUp } from "aws-amplify-react-native";
import { View, Text, StyleSheet } from "react-native";
import { AmplifyButton } from "aws-amplify-react-native";

class MySignUp extends SignUp {
  constructor(props) {
    super(props);
    this._validAuthStates = ["signUp"];
  }

  showComponent() {
    const { theme } = this.props;
    console.log("Here's the theme");
    console.log(theme);
    return (
      <View style={theme.container}>
        <View style={theme.section}>
          <View style={theme.sectionBody}>
            <Text style={theme.label}>
              This app is owned and managed by Counterpart International. Please
              contact your digital security specialist, if you would like an
              account.
            </Text>
            <AmplifyButton
              style={theme.button}
              text="Sign In"
              onPress={() => this.changeState("signIn")}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MySignUp;
