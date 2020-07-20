import { Auth, formField } from "aws-amplify";
import {
  AmplifyButton,
  FormField,
  LinkCell,
  Header,
  ErrorRow,
} from "../AmplifyUI";

async function signIn() {
  try {
    const user = await Auth.signIn(username, password);
  } catch (error) {
    console.log("error signing in", error);
  }
}

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const LoginView = () => {
  return (
    <View>
      <Text>Login Time Baby</Text>
      <FormField />
    </View>
  );
};

export default LoginView;

const styles = StyleSheet.create({});
