import React from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PRIVACY_POLICY_URL } from "../constants";
import { Auth } from "aws-amplify";
import { GREEN_BLUE } from "../theme";
import { AmplifyButton } from "aws-amplify-react-native/dist/AmplifyUI";

export default SettingsView = (props) => {
  const openPrivacyPolicy = () => {
    Linking.canOpenURL(PRIVACY_POLICY_URL).then((supported) => {
      if (supported) {
        Linking.openURL(PRIVACY_POLICY_URL);
      } else {
        console.log("Don't know how to open URL: " + PRIVACY_POLICY_URL);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings and Privacy</Text>
      <TouchableOpacity onPress={openPrivacyPolicy}>
        <Text>Click here to read our Privacy Policy</Text>
      </TouchableOpacity>
      <AmplifyButton
        text="Sign out"
        onPress={() => {
          Auth.signOut();
        }}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: "12%",
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
  },
  button: {
    marginTop: 10,
    backgroundColor: GREEN_BLUE,
  },
});
