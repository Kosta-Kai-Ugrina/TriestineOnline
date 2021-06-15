import { View } from "react-native";
import React, { useState } from "react";
import GameScreen from "./Game";
import StatisticsScreen from "./Statistics";
import HomeScreen from "./Home";

export default function Main() {
  const [playPressed, setPlayPressed] = useState(false);
  const [statisticsPressed, setStatisticsPressed] = useState(false);

  return playPressed ? (
    <GameScreen onGameEnd={() => setPlayPressed(false)} />
  ) : statisticsPressed ? (
    <StatisticsScreen />
  ) : (
    <HomeScreen
      onPlayPressed={() => setPlayPressed(true)}
      onStatisticsPressed={() => setStatisticsPressed(true)}
    />
  );
}
