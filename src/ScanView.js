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
import { RESULTS_SCREEN } from "../constants";

const axiosInstance = axios.create({ withCredentials: true, baseURL: ES_URL });

// Key for async storage last scan time, so user cannot spam scans
const LAST_SCAN_TIME_KEY = "@last_scan_time";

export default ScanView = ({ navigation }) => {
  const onScan = async () => {
    const timeOfScan = new Date();

    let canScan;
    // First check if we can scan
    try {
      // Stored in UTC
      const lastScan = await AsyncStorage.getItem(LAST_SCAN_TIME_KEY);

      // number of milliseconds since beginning of time
      let aDayLater = new Date(lastScan);
      aDayLater.setDate(aDayLater.getDate() + 1);
      console.log(aDayLater);

      canScan = aDayLater < timeOfScan ? true : false;
      if (!canScan) {
        const milliToWait = aDayLater - timeOfScan;
        const hoursToWait = (milliToWait / (1000 * 60 * 60)).toFixed(4);
        const wholeHours = Math.floor(hoursToWait);
        const minutesToWait = ((hoursToWait - wholeHours) * 60).toFixed(0);

        // Currently just alerts
        // alert(
        //   `You must wait ${wholeHours} hours and ${minutesToWait} minutes until you can rescan`
        // );
        // // Don't continue
        // return;
      }
    } catch {
      console.error("There was a problem reading from asyncStorage");
      return;
    }

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

    const result = {
      UUID: myDevice,
      "@timestamp": timeOfScan,
      pinOrFingerPrintPass: intPinOrFinger,
      locationServicesPass: locServicesPassInt,
      platform: platform,
      version: version,
      isNotJailBroken: isNotJailBrokenInt,
    };

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
        console.log("Result from elastic search");
        console.log(res);
        console.log("res status: " + res.status);
        if (res.status === 201) {
          // If all is successful, update the last scan time
          // await AsyncStorage.setItem(LAST_SCAN_TIME_KEY, timeOfScan);

          navigation.push(RESULTS_SCREEN, {
            result: result,
          });
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
