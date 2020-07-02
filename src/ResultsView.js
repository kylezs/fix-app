import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default function ResultsView({setIsResultPage}) {
  const onReturnHome = () => {
    setIsResultPage(false);
  }

  return (
    <View style={styles.container}>
      <Text>Here are your results</Text>
      <Button title="Return home" onPress={onReturnHome} />
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
