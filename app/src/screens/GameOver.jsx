import React from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";

export default function GameOverScreen({ isWon, onHomeClick }) {
  return (
    <View
      style={{
        backgroundColor: isWon ? "green" : "red",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Text style={{ color: "white", fontSize: 40, fontWeight: "bold" }}>
        {isWon === true
          ? "Game won"
          : isWon === false
          ? "Game Lost"
          : "A player disconnected"}
      </Text>
      <TouchableHighlight
        style={{
          backgroundColor: "yellow",
          width: 200,
          height: 100,
          borderRadius: 30,
          borderWidth: 5,
          borderColor: "black",
        }}
        onPressOut={onHomeClick}
      >
        <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
          HOME
        </Text>
      </TouchableHighlight>
    </View>
  );
}
