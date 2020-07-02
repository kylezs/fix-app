import axios from 'axios';
import {StatusBar} from 'expo-status-bar';
import JailMonkey from 'jail-monkey';
import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';


const axiosInstance = axios.create({withCredentials: true, baseURL: '<test>'})

export default function App() {

  const [isResultPage, setIsResultPage] = useState(false);

  const onScan = async () => {

    const timeOfScanUTC = new Date().toUTCString();
    const boolPinOrFinger = await DeviceInfo.isPinOrFingerprintSet()
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

    const data = JSON.stringify({
      'UUID': myDevice,
      '@timestamp': timeOfScanUTC,
      'pinOrFingerPrintPass': intPinOrFinger,
      'locationServicesPass': locServicesPassInt,
      'platform': platform,
      'version': version,
      'isNotJailBroken': isNotJailBrokenInt,
    });

    const config = {
      auth: {
        username: '<test>',
        password: '<test>',
      },
      headers: {
          'Content-Type': 'application/json'
      }
    }

    axiosInstance.post('<test>', data, config
    ).then((res) => {
      console.log('Result from elastic search')
      console.log(res)
    }).catch((err) => {
      console.log('Woops, err here: ', err)
    })

  }

  return (
    <View style={styles.container}>
      <Text>Please run a scan</Text>
      <Button onPress={onScan} title='Scan' />
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
