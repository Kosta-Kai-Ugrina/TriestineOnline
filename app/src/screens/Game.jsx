import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import "../classes/UserAgent";
import { CardData } from "../classes/CardData";
import ImageButton from "../components/ImageButton";
import Hand from "../components/Hand";
import { Audio } from "expo-av";

const SERVER_ADDRESS = "https://still-castle-68445.herokuapp.com";
const io = require("socket.io-client");

export default function GameScreen({ onGameEnd }) {
  const [hand, setHand] = useState(null);
  const [playedCards, setPlayedCards] = useState([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [score, setScore] = useState([0, 0]);
  const [socket, setSocket] = useState(null);
  const [roomID, setRoomID] = useState(null);
  const [changeyBoi, setChangeyBoi] = useState(true);
  const [sound, setSound] = useState(null);
  const [buttonsEnabled, setButtonsEnabled] = useState(false);

  const refresh = () => setChangeyBoi(!changeyBoi);
  // INIT SOCKET
  useEffect(() => {
    let socket = io(SERVER_ADDRESS, {
      reconnectionDelayMax: 10000,
      jsonp: false,
    });

    socket.on("connect", () => console.log("connected"));
    socket.on("disconnect", () => onGameEnd());
    socket.on("log", (msg) => console.log(msg));
    socket.on("id room", (id) => {
      console.log(`got room id: ${id}`);
      setRoomID(roomID);
    });
    socket.on("game start", () => console.log("game started"));
    socket.on("your turn", () => {
      setIsPlayerTurn(true);
      setButtonsEnabled(true);
    });
    socket.on("deal cards", (hand) => {
      console.log("deal cards");
      setHand([...hand.map((card) => CardData.deserialize(card))]);
      refresh();
    });
    socket.on("turn over", () => {
      console.log("turn over");
      setPlayedCards([]);
      refresh();
    });
    socket.on("round over", ([scoreTeam1, scoreTeam2]) => {
      console.log(`SCORE\nTEAM 1: ${scoreTeam1}\tTEAM 2: ${scoreTeam2}`);
      setScore([scoreTeam1, scoreTeam2]);
      refresh();
    });
    socket.on("game over", (isWon) =>
      console.log("You have ", isWon ? "won! :)" : "lost. ;(")
    );
    socket.on("card played", (cards) =>
      setPlayedCards(cards.map((card) => CardData.deserialize(card)))
    );
    socket.on("knock", async () => {
      console.log("KNOCK");
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/play_card.mp3")
      );
      setSound(sound);
      await sound.playAsync();
    });
    socket.on("swipe", async () => {
      console.log("SWIPE");
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/play_card.mp3")
      );
      setSound(sound);
      await sound.playAsync();
    });

    setSocket(socket);
  }, []);

  async function playCard(cardData) {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/play_card.mp3")
    );
    setSound(sound);
    console.log("Playing Sound");
    await sound.playAsync();
    setIsPlayerTurn(false);
    setButtonsEnabled(false);
    setHand([...hand.filter((card) => card.getId() != cardData.getId())]);
    socket.emit("card played", cardData.serialize());
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View
        key="player turn"
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: isPlayerTurn ? "green" : "red",
          borderWidth: 3,
          borderColor: "black",
          position: "absolute",
          top: 30,
          left: 30,
        }}
      ></View>
      <View
        key="scoreboard"
        style={{
          flex: 1,
          flexDirection: "row",
          position: "absolute",
          top: 30,
          right: 30,
        }}
      >
        <Text
          key="score team 1"
          style={{ marginHorizontal: 5, fontSize: 30, fontWeight: "bold" }}
        >
          {score[0]}
        </Text>
        <Text
          key="score team 2"
          style={{ marginHorizontal: 5, fontSize: 30, fontWeight: "bold" }}
        >
          {score[1]}
        </Text>
      </View>
      <Hand
        key="played cards"
        cards={playedCards}
        cardStyle={playedCardStyle}
        handStyle={[styles.playerHandContainer, { marginBottom: 200 }]}
        cardsDisabled={true}
      />
      <Hand
        key="hand"
        cards={hand}
        cardStyle={playerCardStyle}
        cardsDisabled={!isPlayerTurn}
        handStyle={styles.playerHandContainer}
        onCardPress={playCard}
      />
      <View style={{ position: "absolute", bottom: 25, left: 25 }}>
        <ImageButton
          size={50}
          imgSrc={require("../../assets/fist.png")}
          isEnabled={buttonsEnabled}
          onClick={async () => {
            setButtonsEnabled(false);
            socket.emit("knock");
          }}
        />
      </View>
      <View style={{ position: "absolute", bottom: 25, right: 25 }}>
        <ImageButton
          size={50}
          imgSrc={require("../../assets/mop.png")}
          isEnabled={buttonsEnabled}
          onClick={async () => {
            setButtonsEnabled(false);
            socket.emit("swipe");
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#800000",
    alignSelf: "stretch",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  playerHandContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    bottom: 50,
  },
  aiHand: {
    marginBottom: 20,
    paddingHorizontal: 20,
    justifyContent: "space-around",
    alignItems: "flex-start",
    alignSelf: "stretch",
  },
});

const playerCardStyle = StyleSheet.create({
  container: { margin: 5 },
});

const aiCardStyle = StyleSheet.create({
  container: { width: 60, height: 120, margin: 2 },
  content: { width: 20, height: 20, backgroundColor: "gray" },
  text: { fontSize: 8, fontWeight: "bold", color: "white" },
});

const playedCardStyle = StyleSheet.create({
  container: { width: 60, height: 120, margin: 2 },
  content: { width: 50, height: 50, backgroundColor: "red" },
  text: { fontSize: 25, fontWeight: "bold", color: "white" },
});

// AFTER THE ROUND ENDS, RESET THE HANDS
// useEffect(() => {
//   if (players.filter((player) => player.cards.length != 0).length == 0) {
//     setFirstPlayer(firstPlayer == 3 ? 0 : firstPlayer + 1);
//     setPlayers(dealNewCards());
//   }
// }, [players]);

// WHEN A CARD IS PLAYED, REACT ACCORDINGLY
// useEffect(() => {
//   if (turnCounter != 0) {
//     let temp = players;
//     // const playedCard = temp[turnCounter].cards.pop();
//     const playedCard = chooseCard(temp[turnCounter].cards, playedCards);
//     temp[turnCounter].cards = temp[turnCounter].cards.filter(
//       (card) => playedCard.getId() != card.getId()
//     );
//     setPlayers(temp);
//     setTurnCounter(turnCounter == 3 ? 0 : turnCounter + 1);
//     temp = playedCards;
//     temp.push(playedCard);
//     setPlayedCards(temp);
//   } else {
//     setIsPlayerTurn(true);
//   }
//   if (playedCards.length == 4) {
//     console.log(
//       "CARDS PLAYED: ",
//       ...playedCards.map((card) => card.serialize())
//     );
//     const winnerIndex = getWinnerIndex(playedCards);
//     console.log("INDEX OF WINNER IS: ", winnerIndex);
//     console.log(
//       "WINNING TEAM IS: ",
//       winnerIndex % 2 == 0 ? "PLAYER'S TEAM" : "OTHER TEAM"
//     );
//     const points = calculatePoints(playedCards);
//     console.log("POINTS SCORED: ", points);
//     setPlayedCards(new Array());
//   }
// }, [turnCounter]);
