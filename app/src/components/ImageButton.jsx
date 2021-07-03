import React from "react";
import { Image } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

export default function ImageButton({ size, imgSrc, isEnabled, onClick }) {
  return (
    <TouchableHighlight
      style={{
        backgroundColor: isEnabled ? "white" : "#444444",
        borderRadius: size / 2,
        width: size,
        height: size,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
      disabled={!isEnabled}
      onPressOut={onClick}
    >
      <Image
        source={imgSrc}
        style={{ width: size * 0.75, height: size * 0.75 }}
      />
    </TouchableHighlight>
  );
}
