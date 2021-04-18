const suit = {
    COPPA = "coppa",
    BASTONI = "bastoni",
    SPADE = "spade",
    DENARI = "denari",
}

class CardData {
    constructor(isPlayed, suit, value) {
        this.isPlayed = isPlayed,
        this.suit = suit,
        this.value = value
    }
}
