import React from "react";
import { Text, View } from "react-native";

const iconMap = {
  books: "📖",
  words: "💬",
  phonemes: "✏️",
};

const Icon = ({ name, color, style, ...props }) => {
  const icon = iconMap[name];

  return <View style={{width: "100%", height: "100%", display: "flex", alignItems: "center", "justifyContent": "center", backgroundColor: color}}><Text style={[{ textAlign: "center", fontSize: 26, color }, style]}>{icon}</Text></View>;
};

export default Icon;
