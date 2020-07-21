import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

// These should not be made into a pass or fail, nor should they be coloured
const METADATA_LIST = ["UUID", "@timestamp", "platform", "version", "email"];

export default function ResultsView({ route }) {
  const data = route.params.result;
  let metaDataKvPairs = [];
  let checkDataKvPairs = [];

  // Split to display in 2 different lists
  for (const property in data) {
    if (METADATA_LIST.includes(property)) {
      metaDataKvPairs.push({ key: property, value: data[property] });
    } else {
      checkDataKvPairs.push({ key: property, value: data[property] });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Device</Text>
      <FlatList
        style={styles.flatList}
        data={metaDataKvPairs}
        renderItem={({ item, index }) => (
          <MetaDataItem key={index} item={item} />
        )}
      />
      <Text style={styles.title}>Results</Text>
      <FlatList
        style={styles.flatList}
        data={checkDataKvPairs}
        renderItem={({ item, index }) => <CheckItem key={index} item={item} />}
      />
    </View>
  );
}

const MetaDataItem = ({ item }) => {
  let value;
  let key;
  if (item.key === "@timestamp") {
    key = "Time of scan";
    value = item.value.toLocaleString();
  } else {
    key = item.key;
    value = item.value;
  }
  return (
    <View style={styles.metadata}>
      <Text style={styles.itemKey}>{key}</Text>
      <Text style={styles.itemValue}>{value}</Text>
    </View>
  );
};

const CheckItem = ({ item }) => {
  const value = item.value === 1 ? "Pass" : "Fail";
  const conditionalStyle = item.value === 1 ? itemSuccess : itemFail;
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
  metadata: {
    alignItems: "center",
    borderBottomWidth: 1,
    paddingBottom: 6,
  },
  item: {
    padding: 6,
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
