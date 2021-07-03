import { View } from "react-native";
import React, { useState } from "react";
import GameScreen from "./Game";
import GameOverScreen from "./GameOver";
import StatisticsScreen from "./Statistics";
import HomeScreen from "./Home";

export default function Main() {
  const [playPressed, setPlayPressed] = useState(false);
  const [statisticsPressed, setStatisticsPressed] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isWon, setIsWon] = useState(null);

  return playPressed && !gameOver ? (
    <GameScreen
      onGameEnd={(result) => {
        setPlayPressed(false);
        setIsWon(result);
      }}
    />
  ) : !playPressed && gameOver ? (
    <GameOverScreen onHomeClick={() => setGameOver(false)} isWon={isWon} />
  ) : statisticsPressed ? (
    <StatisticsScreen />
  ) : (
    <HomeScreen
      onPlayPressed={() => setPlayPressed(true)}
      onStatisticsPressed={() => setStatisticsPressed(true)}
    />
  );
}
