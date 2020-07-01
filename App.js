import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';


export default function App() {
  const onScan =
      () => {
        console.log('Hello, scan ran');
      }

  const styles = StyleSheet

  return (
    <View style={styles.container}>
      <Text>Please run a scan</Text>
      <FlatList>
      <View style={styles}>
        <Text>OS Version: 0.0.0</Text>
        </View>
        <View>
        <Text>OS Version: 0.0.0</Text>
        </View>
        <View>
        <Text>OS Version: 0.0.0</Text>
        </View>
      </FlatList>
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
