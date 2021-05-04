import React from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableHighlight,
} from "react-native";

export default function Card({
  data,
  onPress,
  isDisabled,
  style: { container, content, text } = {},
}) {
  return (
    <View style={[defaultStyles.container, container]}>
      <TouchableHighlight onPress={() => onPress(data)} disabled={isDisabled}>
        <View style={[defaultStyles.content, content]}>
          <Text style={[defaultStyles.text, text]}>
            {data.suit}
            {data.value}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  container: {
    width: 60,
    height: 50,
    borderRadius: 10,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: 50,
    height: 40,
    borderRadius: 5,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
