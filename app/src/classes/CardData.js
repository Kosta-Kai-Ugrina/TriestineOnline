const suit = {
  COPPA: "coppa",
  BASTONI: "bastoni",
  SPADE: "spade",
  DENARI: "denari",
};

export class CardData {
  constructor(suit, value) {
    (this.isPlayed = false), (this.suit = suit), (this.value = value);
  }
}
