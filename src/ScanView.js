import axios from 'axios';
import JailMonkey from 'jail-monkey';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {ES_INDEX_PATH, ES_PASSWORD, ES_URL, ES_USERNAME} from 'react-native-dotenv';

const axiosInstance = axios.create({withCredentials: true, baseURL: ES_URL})

export default ScanView = ({navigation}) => {

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

    const result = {
      'UUID': myDevice,
      '@timestamp': timeOfScanUTC,
      'pinOrFingerPrintPass': intPinOrFinger,
      'locationServicesPass': locServicesPassInt,
      'platform': platform,
      'version': version,
      'isNotJailBroken': isNotJailBrokenInt,
    };

    const resultJSON = JSON.stringify(result);

    const config =
        {
          auth: {
            username: ES_USERNAME,
            password: ES_PASSWORD,
          },
          headers: {'Content-Type': 'application/json'}
        }
      
    axiosInstance.post(ES_INDEX_PATH, resultJSON, config)
        .then((res) => {
          console.log('Result from elastic search')
          console.log(res)
          console.log('res status: ' + res.status)
          if (res.status === 201) {
            // Show the results of their privacy settings.
                  // show the results page
          navigation.push('Results', {
            result: result
          })
          }
          else {
            console.error(
                'Something went wrong sending the data to the dashboard')
          }
        })
        .catch(
            (err) => {
                console.log('Error sending data to elasticsearch ', err)})

  }
  return (
    <View style={styles.container}>
      <Text>Please run a scan</Text>
      <Button onPress={onScan} title='Scan' />
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
