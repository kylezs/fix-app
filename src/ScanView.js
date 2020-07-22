import axios from "axios";
import JailMonkey from "jail-monkey";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DeviceInfo from "react-native-device-info";
import {
  ES_INDEX_PATH,
  ES_PASSWORD,
  ES_URL,
  ES_USERNAME,
} from "react-native-dotenv";
import AsyncStorage from "@react-native-community/async-storage";
import { BluetoothStatus } from "react-native-bluetooth-status";
import { RESULTS_SCREEN } from "../constants";
import { GREEN_BLUE } from "../theme";
import { Auth, nav } from "aws-amplify";
import { AmplifyButton } from "aws-amplify-react-native";
import AmplifyTheme from "aws-amplify-react-native/dist/AmplifyTheme";

const axiosInstance = axios.create({ withCredentials: true, baseURL: ES_URL });

// Key for async storage last scan time, so user cannot spam scans to ES
const LAST_SCAN_TIME_KEY = "@last_scan_time";

export default ScanView = ({ navigation }) => {
  const sendToES = async (result) => {
    const resultJSON = JSON.stringify(result);

    const config = {
      auth: {
        username: ES_USERNAME,
        password: ES_PASSWORD,
      },
      headers: { "Content-Type": "application/json" },
    };

    axiosInstance
      .post(ES_INDEX_PATH, resultJSON, config)
      .then(async (res) => {
        if (res.status === 201) {
          // If all is successful, update the last scan time
          // AsyncStorage only takes strings as values
          await AsyncStorage.setItem(
            LAST_SCAN_TIME_KEY,
            result["@timestamp"].getTime().toString()
          );
        } else {
          console.error(
            "Something went wrong sending the data to the dashboard"
          );
        }
      })
      .catch((err) => {
        console.error("Error sending data to elasticsearch ", err);
      });
  };

  /*
    Collect a bunch of device information, including device metadata and
    the state of particular preferences. 
  */
  const getDeviceInfo = async (timeOfScan) => {
    const boolPinOrFinger = await DeviceInfo.isPinOrFingerprintSet();
    const intPinOrFinger = boolPinOrFinger ? 1 : 0;

    const myDevice = DeviceInfo.getUniqueId();
    // android, ios, windows...
    const platform = DeviceInfo.getSystemName();
    const version = DeviceInfo.getSystemVersion();

    const locServicesEnabledBool = await DeviceInfo.isLocationEnabled();
    // A pass is if location services are OFF, i.e. not enabled
    const locServicesPassInt = locServicesEnabledBool ? 0 : 1;

    const isJailBroken = JailMonkey.isJailBroken();
    // a pass if it's NOT jailbroken
    const isNotJailBrokenInt = isJailBroken ? 0 : 1;

    const bluetoothEnabledBool = await BluetoothStatus.state();
    // A pass if bluetooth is NOT on
    const bluetoothPass = bluetoothEnabledBool ? 0 : 1;

    const result = {
      // Metadata
      UUID: myDevice,
      "@timestamp": timeOfScan,
      platform: platform,
      version: version,
      // Checks
      isNotJailBroken: isNotJailBrokenInt,
      pinOrFingerPrintPass: intPinOrFinger,
      locationServicesPass: locServicesPassInt,
      bluetoothPass: bluetoothPass,
    };
    return result;
  };

  const canSendToES = async (timeOfScan) => {
    // First, check if we can scan
    let canSend;
    // await AsyncStorage.removeItem(LAST_SCAN_TIME_KEY);
    try {
      const lastScanString = await AsyncStorage.getItem(LAST_SCAN_TIME_KEY);
      const lastScan = new Date(parseInt(lastScanString));

      let aDayLater = new Date(lastScan);
      aDayLater.setDate(aDayLater.getDate() + 1);

      canSend = aDayLater < timeOfScan ? true : false;
      if (!canSend) {
        const milliToWait = aDayLater - timeOfScan;
        const hoursToWait = milliToWait / (1000 * 60 * 60);
        const wholeHours = Math.floor(hoursToWait);
        const wholeMinutes = Math.floor((hoursToWait - wholeHours) * 60);
        console.log(
          `Can report again in ${wholeHours} hours and ${wholeMinutes} minutes`
        );
        return false;
      }
      return true;
    } catch {
      console.error("There was a problem reading from asyncStorage");
      return false;
    }
  };

  const onScan = async () => {
    const timeOfScan = new Date();
    const canSend = await canSendToES(timeOfScan);

    const result = await getDeviceInfo(timeOfScan);
    // Date or false

    // Ensure user is logged in
    let email;
    Auth.currentAuthenticatedUser()
      .then((currUser) => {
        console.log("current user");
        console.log(currUser);
        email = currUser.attributes.email;
        result["email"] = email;
        if (canSend) {
          sendToES(result);
        }
        console.log(navigation);
        navigation.push(RESULTS_SCREEN, {
          result: result,
        });
      })
      .catch(async (err) => {
        console.log("Cannot fetch user: ", err);
        // await Auth.signOut();
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please run a scan</Text>
      <AmplifyButton onPress={onScan} text="Scan" style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  button: {
    ...AmplifyTheme.button,
    backgroundColor: GREEN_BLUE,
  },
});
