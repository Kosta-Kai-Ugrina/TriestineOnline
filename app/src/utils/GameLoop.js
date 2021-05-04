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

function getCalcValue(value) {
  return value <= 3 ? value : value - 13;
}

export const getWinnerIndex = (playedCards) => {
  const ledSuit = playedCards[0].suit;
  let highestValue = getCalcValue(playedCards[0].value);
  let winnerIndex = 0;
  for (let i = 1; i < 4; i++) {
    if (
      playedCards[i].suit == ledSuit &&
      getCalcValue(playedCards[i].value) > highestValue
    ) {
      highestValue = getCalcValue(playedCards[i].value);
      winnerIndex = i;
    }
  }
  return winnerIndex;
};

export const calculatePoints = (playedCards) => {
  let points = 0;
  for (let i = 0; i < 4; i++) {
    const value = playedCards[i].value;
    if (value == 1) points += 3;
    else if (value <= 3) points += 1;
    else if (value >= 11) points += 1;
  }
  return (points * 1.0) / 3;
};

export const chooseCard = (playerHand, playedCards) => {
  const ledSuit = playedCards[0].suit;
  if (playerHand.filter((card) => card.suit == ledSuit).length > 0) {
    const strongestCard = playerHand
      .filter((card) => card.suit == ledSuit)
      .sort((a, b) => getCalcValue(a.value) > getCalcValue(b.value))
      .pop();
    return strongestCard;
  } else {
    playerHand = playerHand.sort(
      (a, b) => getCalcValue(a.value) < getCalcValue(b.value)
    );
    return playerHand.pop();
  }
};
