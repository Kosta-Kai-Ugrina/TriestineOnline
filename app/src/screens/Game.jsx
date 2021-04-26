import React from "react"
import { View, Text } from "react-native";
import { CardData } from "../classes/CardData"
import { Player } from "../classes/Player"

const suitCode = ['C', 'B', 'S', 'D'];
const valueCode = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13'];

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
      console.log(card.suit, card.value);
      cardDeck.push(card);
    }
  }
  return (cardDeck);
}

export default function GameScreen() {
  const cardDeck = getCardDeck();
  printCardData(cardDeck);
  //const players = [new Player('player1', cardsPlayer1), new Player('player2', cardsPlayer2),
    //new Player('player3', cardsPlayer3), new Player('player4', cardsPlayer4)];
  return (
    <View>
      <Text>GAME SCREEN</Text>
    </View>
  );
}
