import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { CardData } from "../classes/CardData";
import Hand from "../components/Hand";
import {
  dealNewCards,
  getWinnerIndex,
  calculatePoints,
  chooseCard,
} from "../utils/GameLoop";

export default function GameScreen() {
  const [players, setPlayers] = useState(dealNewCards());
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [turnCounter, setTurnCounter] = useState(0);
  const [playedCards, setPlayedCards] = useState(new Array());
  const [firstPlayer, setFirstPlayer] = useState(0);
  const [currPoints, setCurrPoints] = useState([0, 0]);

  // AFTER THE ROUND ENDS, RESET THE HANDS
  // useEffect(() => {
  //   if (players.filter((player) => player.cards.length != 0).length == 0) {
  //     setFirstPlayer(firstPlayer == 3 ? 0 : firstPlayer + 1);
  //     setPlayers(dealNewCards());
  //   }
  // }, [players]);

  // WHEN A CARD IS PLAYED (PUSHED INTO playedCards ARR), REACT ACCORDINGLYs
  useEffect(() => {
    if (turnCounter != 0) {
      let temp = players;
      // const playedCard = temp[turnCounter].cards.pop();
      const playedCard = chooseCard(temp[turnCounter].cards, playedCards);
      temp[turnCounter].cards = temp[turnCounter].cards.filter(
        (card) => playedCard.getId() != card.getId()
      );
      setPlayers(temp);
      setTurnCounter(turnCounter == 3 ? 0 : turnCounter + 1);
      temp = playedCards;
      temp.push(playedCard);
      setPlayedCards(temp);
    } else {
      setIsPlayerTurn(true);
    }
    if (playedCards.length == 4) {
      console.log(
        "CARDS PLAYED: ",
        ...playedCards.map((card) => card.serialize())
      );
      const winnerIndex = getWinnerIndex(playedCards);
      console.log("INDEX OF WINNER IS: ", winnerIndex);
      console.log(
        "WINNING TEAM IS: ",
        winnerIndex % 2 == 0 ? "PLAYER'S TEAM" : "OTHER TEAM"
      );
      const points = calculatePoints(playedCards);
      console.log("POINTS SCORED: ", points);
      setPlayedCards(new Array());
    }
  }, [turnCounter]);

  const playCard = (cardData) => {
    let temp = players;
    temp[0].cards = temp[0].cards.filter(
      (card) => card.getId() != cardData.getId()
    );
    setPlayers(temp);

    temp = playedCards;
    temp.push(cardData);
    setPlayedCards(temp);

    setIsPlayerTurn(false);
    setTurnCounter(1);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* 
          PLAYED CARDS
      */}
      <Hand
        key="playedCards"
        cards={playedCards}
        cardStyle={playedCardStyle}
        handStyle={[styles.playerHandContainer, { marginBottom: 200 }]}
        cardsDisabled={true}
      />
      {/* 
          PLAYER AND AI HANDS, 
          THE TERNARIES CHECK WHETHER IT IS THE PLAYER
          (WHO IS ON INDEX 0) OR AN AI (INDICES 1, 2 AND 3) 
      */}
      {players.map(({ cards }, index) => (
        <Hand
          key={`player${index + 1}`}
          cards={cards}
          cardStyle={index == 0 ? playerCardStyle : aiCardStyle}
          cardsDisabled={index != 0 || !isPlayerTurn}
          handStyle={
            index == 0
              ? styles.playerHandContainer
              : [styles.playerHandContainer, styles.aiHand]
          }
          onCardPress={index == 0 ? playCard : () => {}}
        />
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
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
  container: { width: 25, height: 25, margin: 2 },
  content: { width: 20, height: 20, backgroundColor: "gray" },
  text: { fontSize: 8, fontWeight: "bold", color: "white" },
});

const playedCardStyle = StyleSheet.create({
  container: { width: 60, height: 60, margin: 2 },
  content: { width: 50, height: 50, backgroundColor: "red" },
  text: { fontSize: 25, fontWeight: "bold", color: "white" },
});

// OLD

{
  /* 
        <View
          key="playedCards"
          style={[styles.playerHandContainer, { marginBottom: 200 }]}
        >
          {playedCards.map((cardData, index) => (
            <Card
              key={`playedCard${index + 1}`}
              data={cardData}
              style={playedCardStyle}
              isDisabled={true}
            />
          ))}
        </View>
         */
}
{
  /* {players
        .filter((hand, index) => index > 0)
        .map((hand, indexHand) => (
          <View
            key={`ai${indexHand + 1}`}
            style={[styles.playerHandContainer, styles.aiHand]}
          >
            {hand.cards.map((cardData, index) => (
              <Card
                key={`ai${indexHand + 1}${index + 1}`}
                data={cardData}
                isDisabled={true}
                style={aiCardStyle}
              />
            ))}
          </View>
        ))} */
}
{
  /* 
      <View key="playerHand" style={styles.playerHandContainer}>
        {players[0].cards.map((cardData, index) => (
          <Card
            key={`p1${index + 1}`}
            data={cardData}
            onPress={() => {
              console.log(`Card ${cardData.suit[0]}${cardData.value} pressed`);
              pushToArray(playedCards, setPlayedCards, cardData);
              let temp = players;
              temp[0].cards = temp[0].cards.filter(
                (card) => card.getId() != cardData.getId()
              );
              setPlayers(temp);
              setIsPlayerTurn(false);
              setTurnCounter(1);
            }}
            isDisabled={!isPlayerTurn}
            style={{
              container: { margin: 5 },
            }}
          />
        ))}
      </View> */
}
