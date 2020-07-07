import axios from "axios";
import JailMonkey from "jail-monkey";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
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
          await AsyncStorage.setItem(
            LAST_SCAN_TIME_KEY,
            result["@timestamp"].toLocaleString()
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

  const getDeviceInfo = async (timeOfScan) => {
    const boolPinOrFinger = await DeviceInfo.isPinOrFingerprintSet();
    const intPinOrFinger = boolPinOrFinger ? 1 : 0;

    const myDevice = DeviceInfo.getUniqueId();
    // android, ios, windows...
    const platform = DeviceInfo.getSystemName();
    const version = DeviceInfo.getVersion();

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

  const onScan = async () => {
    const timeOfScan = new Date();

    // First, check if we can scan
    let canScan;
    try {
      const lastScan = await AsyncStorage.getItem(LAST_SCAN_TIME_KEY);

      let aDayLater = new Date(lastScan);
      aDayLater.setDate(aDayLater.getDate() + 1);

      canScan = aDayLater < timeOfScan ? true : false;
      if (!canScan) {
        const milliToWait = aDayLater - timeOfScan;
        const hoursToWait = milliToWait / (1000 * 60 * 60);
        const wholeHours = Math.floor(hoursToWait);
        const wholeMinutes = Math.floor((hoursToWait - wholeHours) * 60);
        console.log(
          `Can report again in ${wholeHours} hours and ${wholeMinutes} minutes`
        );
      }
    } catch {
      console.error("There was a problem reading from asyncStorage");
      return;
    }
    const result = await getDeviceInfo(timeOfScan);

    if (canScan) {
      await sendToES(result);
    }

    // Even if we don't want to spam the server, we can let the user
    // see their progress
    navigation.push(RESULTS_SCREEN, {
      result: result,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please run a scan</Text>
      <Button onPress={onScan} title="Scan" />
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
});
