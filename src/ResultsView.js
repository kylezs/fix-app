import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function ResultsView({result}) {
  return (
    <View style={styles.container}>
      <Text>Here are your results</Text>
      <Text>
        {result}
      </Text>
    </View>
  );
}

const Item = ({item}) => (
  <View>
    <Text>
      {item.key}: {item.value}
    </Text>
    </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
