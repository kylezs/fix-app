import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default ScanView = ({onScan}) => {
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
