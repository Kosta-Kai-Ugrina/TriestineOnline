import { CardData } from "../classes/CardData";

const allCards = [
  "C01",
  "C02",
  "C03",
  "C04",
  "C05",
  "C06",
  "C07",
  "C11",
  "C12",
  "C13",
  "B01",
  "B02",
  "B03",
  "B04",
  "B05",
  "B06",
  "B07",
  "B11",
  "B12",
  "B13",
  "S01",
  "S02",
  "S03",
  "S04",
  "S05",
  "S06",
  "S07",
  "S11",
  "S12",
  "S13",
  "D01",
  "D02",
  "D03",
  "D04",
  "D05",
  "D06",
  "D07",
  "D11",
  "D12",
  "D13",
];

function shuffleDeck() {
  let shuffledDeck = new Array(...allCards);
  shuffledDeck.sort(() => Math.random() - 0.5);
  return shuffledDeck;
}

function dealCards(deck) {
  let playerHands = new Array(4);
  for (let i = 0; i < 4; i++) {
    playerHands[i] = deck.splice(0, 10);
  }
  return playerHands;
}

export const dealNewCards = () => {
  return dealCards(shuffleDeck()).map((playerHand, index) => {
    return {
      name: `Player ${index + 1}`,
      cards: playerHand.map((card) => CardData.deserialize(card)),
    };
  });
};
