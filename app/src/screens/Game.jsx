import React from "react"
import { View, Text } from "react-native";
import { CardData } from "../classes/CardData"
import { Player } from "../classes/Player"
import Card from "../components/Card";

const suitCode = ['C', 'B', 'S', 'D'];
const valueCode = ['01', '02', '03', '04', '05', '06', '07', '11', '12', '13'];

function printCardData(cards) {
  const size = cards.length;

  for (let i = 0; i < size; i++)
    console.log(cards[i].suit, cards[i].value);
}

function getCardDeck() {
  let cardDeck = new Array();
  let valueCodeSize = valueCode.length;
  let suitCodeSize = suitCode.length;

  for (let i = 0; i < valueCodeSize; i++) {
    for (let j = 0; j < suitCodeSize; j++) {
      let card = new CardData(suitCode[j], valueCode[i]);
      cardDeck.push(card);
    }
  }
  return (cardDeck);
}

function shuffleCardDeck(cards) {
  cards.sort(() => Math.random() - 0.5);
  let cardsPlayers = new Array();

  while (cards.length > 0)
    cardsPlayers.push(cards.splice(0, 10));
  return (cardsPlayers);
}

export default function GameScreen() {
  const cardDeck = getCardDeck();
  printCardData(cardDeck);
  let cardsPlayers = shuffleCardDeck(cardDeck);
  const players = [new Player('player1', cardsPlayers[0]), new Player('player2', cardsPlayers[1]),
    new Player('player3', cardsPlayers[2]), new Player('player4', cardsPlayers[3])];
  console.log('PLAYERS:');
  console.log(players);
  return (
    <View>
      {players[0].cards.map(cardData => <Card data={cardData} />)}
    </View>
  );
}
