import React from "react";
import { View, Text, StyleSheet, Linking, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PRIVACY_POLICY_URL } from "../constants";
import { Auth } from "aws-amplify";

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
      <Text style={styles.title}>Settings Page</Text>
      <TouchableOpacity onPress={openPrivacyPolicy}>
        <Text>Click here to read our Privacy Policy</Text>
      </TouchableOpacity>
      <Button
        title="Sign out"
        onPress={() => {
          Auth.signOut();
        }}
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
});
