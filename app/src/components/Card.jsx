import React from "react";
import {useState } from "react";
import { Text, View, StyleSheet, Button, TouchableHighlight } from 'react-native';

export default function Card({ data: { suit, value } }) {
  console.log("suit = ", suit, " value = ", value);
  const [count, setCount] = useState(0);
  const onPress = () => setCount(count + 1);
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={onPress}>
        <View style={styles.button}>
          <Text>{suit} {value}</Text>
        </View>
      </TouchableHighlight>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>
          {count ? count : null}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    height: 30,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "bottom",
  },
  button: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 8

  },
  countContainer: {
    alignItems: "center",
  },
  countText: {
    color: "white"
  }
});