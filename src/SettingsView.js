import React from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default SettingsView = () => {
  const privacyPolicyLocation = "https://www.google.com";
  const openPrivacyPolicy = () => {
    Linking.canOpenURL(privacyPolicyLocation).then((supported) => {
      if (supported) {
        Linking.openURL(privacyPolicyLocation);
      } else {
        console.log("Don't know how to open URL: " + privacyPolicyLocation);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings Page</Text>
      <TouchableOpacity onPress={openPrivacyPolicy}>
        <Text>Click here to read our Privacy Policy</Text>
      </TouchableOpacity>
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
