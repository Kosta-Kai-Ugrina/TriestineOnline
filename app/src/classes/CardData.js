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

  serialize = () =>
    `${this.suit[0].toUpperCase()}${
      this.value < 10 ? "0" + this.value.toString() : this.value.toString()
    }`;

  getId = () => this.serialize();

  static deserialize = (cardCode) => {
    return new CardData(cardCode[0], parseInt(cardCode.substring(1, 3)));
  };
}
