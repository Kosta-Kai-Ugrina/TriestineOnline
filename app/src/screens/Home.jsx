import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";

export default function HomeScreen({ onPlayPressed, onStatisticsPressed }) {
  return (
    <View style={styles.mainContainer}>
      <Button text="Play" onPress={onPlayPressed} />
      <Button text="Statistics" onPress={onStatisticsPressed} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
