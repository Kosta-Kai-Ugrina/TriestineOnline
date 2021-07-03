import React, { useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { getGamesPlayed, getGamesWon } from "../classes/Storage";

export default function StatisticsScreen() {
  const gamesPlayed = useState(getGamesPlayed())[0];
  const gamesWon = useState(getGamesWon())[0];

  return (
    <SafeAreaView
      style={{ alignItems: "center", justifyContent: "space-around" }}
    >
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        Games played: {gamesPlayed}
      </Text>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        Games won: {gamesWon}
      </Text>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        Games lost: {gamesPlayed - gamesWon}
      </Text>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        Games won %: {((gamesWon * 1.0) / (gamesPlayed * 1.0)) * 100}%
      </Text>
    </SafeAreaView>
  );
}
