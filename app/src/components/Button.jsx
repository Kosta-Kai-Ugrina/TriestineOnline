import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Button({ text, style, onPress }) {
  return (
    <View style={[styles.defaultContainer, style]} onTouchEnd={onPress}>
      <Text style={[styles.defaultText, style]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  defaultContainer: {
    backgroundColor: "#B22222",
    height: 100,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 5,
  },
  defaultText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  },
});
