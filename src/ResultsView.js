import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

// These should not be made into a pass or fail, nor should they be coloured
const METADATA_LIST = ["UUID", "@timestamp", "platform", "version"];

export default function ResultsView({ route, navigation }) {
  const data = route.params.result;
  let flatListKvPairs = [];

  // Convert into a flatlist renderable format
  for (const property in data) {
    flatListKvPairs.push({ key: property, value: data[property] });
  }

  // Split into two lists Metadata and tested things

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Here are your results</Text>
      <FlatList
        style={styles.flatList}
        data={flatListKvPairs}
        renderItem={({ item, index }) => <Item key={index} item={item} />}
      />
    </View>
  );
}

// An individual item of the flatlist
const Item = ({ item }) => {
  let value;
  let conditionalStyle = styles.item;
  if (!METADATA_LIST.includes(item.key)) {
    // Only the "tested" items (e.g. location services, pin/fingerprint)
    value = item.value === 1 ? "Pass" : "Fail";
    conditionalStyle = item.value === 1 ? itemSuccess : itemFail;
  } else {
    // Only the metadata items (e.g. UUID, @timestamp)
    if (item.key === "@timestamp") {
      value = item.value.toLocaleString();
    } else {
      value = item.value;
    }
  }
  return (
    <View style={conditionalStyle}>
      <Text style={styles.itemKey}>{item.key}</Text>
      <Text style={styles.itemValue}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: "4%",
  },
  flatList: {
    width: "95%",
  },
  item: {
    borderColor: "grey",
    borderBottomWidth: 2,
    height: 44,
    paddingLeft: 4,
    color: "black",
  },
  success: {
    backgroundColor: "#00FF00",
  },
  fail: {
    backgroundColor: "red",
  },
  itemKey: {
    fontSize: 15,
    paddingBottom: 4,
  },
  itemValue: {
    fontSize: 12,
  },
  title: {
    fontSize: 20,
    marginBottom: "4%",
  },
});

const itemSuccess = StyleSheet.compose(styles.item, styles.success);
const itemFail = StyleSheet.compose(styles.item, styles.fail);
