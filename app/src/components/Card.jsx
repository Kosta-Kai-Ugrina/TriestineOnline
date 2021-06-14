import React from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableHighlight,
  Image,
} from "react-native";

const cardsImages = [
  {code : "C1" , path : require('../../assets/cards/C1.jpg')},
  {code : "C2", path : require('../../assets/cards/C2.jpg')},
  {code : "C3", path : require('../../assets/cards/C3.jpg')},
  {code : "C4", path : require('../../assets/cards/C4.jpg')},
  {code : "C5", path : require('../../assets/cards/C5.jpg')},
  {code : "C6", path : require('../../assets/cards/C6.jpg')},
  {code : "C7", path : require('../../assets/cards/C7.jpg')},
  {code : "C11", path : require('../../assets/cards/C11.jpg')},
  {code : "C12", path : require('../../assets/cards/C12.jpg')},
  {code : "C13", path : require('../../assets/cards/C13.jpg')},
  {code : "B1", path : require('../../assets/cards/B1.jpg')},
  {code : "B2", path : require('../../assets/cards/B2.jpg')},
  {code : "B3", path : require('../../assets/cards/B3.jpg')},
  {code : "B4", path : require('../../assets/cards/B4.jpg')},
  {code : "B5", path : require('../../assets/cards/B5.jpg')},
  {code : "B6", path : require('../../assets/cards/B6.jpg')},
  {code : "B7", path : require('../../assets/cards/B7.jpg')},
  {code : "B11", path : require('../../assets/cards/B11.jpg')},
  {code : "B12", path : require('../../assets/cards/B12.jpg')},
  {code : "B13", path : require('../../assets/cards/B13.jpg')},
  {code : "S1", path : require('../../assets/cards/S1.jpg')},
  {code : "S2", path : require('../../assets/cards/S2.jpg')},
  {code : "S3", path : require('../../assets/cards/S3.jpg')},
  {code : "S4", path : require('../../assets/cards/S4.jpg')},
  {code : "S5", path : require('../../assets/cards/S5.jpg')},
  {code : "S6", path : require('../../assets/cards/S6.jpg')},
  {code : "S7", path : require('../../assets/cards/S7.jpg')},
  {code : "S11", path : require('../../assets/cards/S11.jpg')},
  {code : "S12", path : require('../../assets/cards/S12.jpg')},
  {code : "S13", path : require('../../assets/cards/S13.jpg')},
  {code : "D1", path : require('../../assets/cards/D1.jpg')},
  {code : "D2", path : require('../../assets/cards/D2.jpg')},
  {code : "D3", path : require('../../assets/cards/D3.jpg')},
  {code : "D4", path : require('../../assets/cards/D4.jpg')},
  {code : "D5", path : require('../../assets/cards/D5.jpg')},
  {code : "D6", path : require('../../assets/cards/D6.jpg')},
  {code : "D7", path : require('../../assets/cards/D7.jpg')},
  {code : "D11", path : require('../../assets/cards/D11.jpg')},
  {code : "D12", path : require('../../assets/cards/D12.jpg')},
  {code : "D13", path : require('../../assets/cards/D13.jpg')},
];

function getCardImage(suit, value) {
  let card = suit.toString() + value.toString();
  let i;

  for (i = 0; i < cardsImages.length; i++) {
    if (card === cardsImages[i].code)
      break;
  }
  return cardsImages[i].path
}

export default function Card({
  data,
  onPress,
  isDisabled,
  style: { container, content, text } = {},
}) {
  let path = getCardImage(data.suit, data.value);
  return (
    <View style={[defaultStyles.container, container]}>
      <TouchableHighlight onPress={() => onPress(data)} disabled={isDisabled}>
      <Image 
        style={defaultStyles.image}
        source={getCardImage(data.suit, data.value)}
      />
      </TouchableHighlight>
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  container: {
    width: 60,
    height: 120,
    borderRadius: 10,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: 50,
    height: 40,
    borderRadius: 5,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
  image: {
    width: 60,
    height: 120,
    flex: 1,
    justifyContent: "center",
  },
});