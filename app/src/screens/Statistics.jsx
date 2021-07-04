import React, { useState } from "react";
import { SafeAreaView, Text, Image, TouchableHighlight } from "react-native";
import { getGamesPlayed, getGamesWon } from "../classes/Storage";

export default function StatisticsScreen({ onBackBtnClick }) {
  const gamesPlayed = useState(getGamesPlayed())[0];
  const gamesWon = useState(getGamesWon())[0];

  return (
    <SafeAreaView
      style={{ alignItems: "center", justifyContent: "space-around" }}
    >
      <TouchableHighlight
        style={{
          width: 30,
          height: 30,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 25,
          left: 25,
        }}
        onPressOut={onBackBtnClick}
      >
        <Image
          style={{ width: 25, height: 25 }}
          source={require("../../assets/back.png")}
        />
      </TouchableHighlight>
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
