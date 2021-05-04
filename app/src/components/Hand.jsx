import React from "react";
import { View } from "react-native";
import Card from "./Card";
import CardData from "../classes/CardData";

export default function Hand({
  cards,
  onCardPress,
  cardsDisabled,
  cardStyle,
  handStyle,
}) {
  return (
    <View style={handStyle}>
      {cards.map((cardData, index) => (
        <Card
          key={cardData.getId()}
          data={cardData}
          onPress={onCardPress}
          isDisabled={cardsDisabled}
          style={cardStyle}
        />
      ))}
    </View>
  );
}
