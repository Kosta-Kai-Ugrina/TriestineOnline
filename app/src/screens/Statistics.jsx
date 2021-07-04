import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, Image, TouchableHighlight } from "react-native";
import { getGamesPlayed, getGamesWon } from "../classes/Storage";

export default function StatisticsScreen({ onBackBtnClick }) {
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [gamesWon, setGamesWon] = useState(0);

  useEffect(() => {
    getGamesPlayed().then((played) => setGamesPlayed(played));
    getGamesWon().then((won) => setGamesWon(won));
  }, []);

  return (
    <SafeAreaView
      style={{
        alignItems: "flex-start",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <TouchableHighlight
        style={{
          width: 30,
          height: 30,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 75,
          left: 25,
        }}
        onPressOut={onBackBtnClick}
      >
        <Image
          style={{ width: 25, height: 25 }}
          source={require("../../assets/back.png")}
        />
      </TouchableHighlight>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          marginVertical: 15,
          marginLeft: 50,
        }}
      >
        Games played: {gamesPlayed}
      </Text>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          marginVertical: 15,
          marginLeft: 50,
        }}
      >
        Games won: {gamesWon}
      </Text>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          marginVertical: 15,
          marginLeft: 50,
        }}
      >
        Games lost: {gamesPlayed - gamesWon}
      </Text>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          marginVertical: 15,
          marginLeft: 50,
        }}
      >
        Games won %:{" "}
        {gamesPlayed === 0
          ? 100
          : ((gamesWon * 1.0) / (gamesPlayed * 1.0)) * 100}
        %
      </Text>
    </SafeAreaView>
  );
}
