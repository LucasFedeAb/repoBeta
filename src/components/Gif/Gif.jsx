import React, { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import styles from "./Gif.style";
import { Ionicons } from "@expo/vector-icons";

const Gif = ({ id, url, title, index, width = width || 175, heigth }) => {
  const [isFav, setIsFav] = useState(false);

  const masonryEffectHeight = [
    180, 140, 150, 220, 180, 140, 110, 150, 180, 165, 200,
  ];
  const height = heigth
    ? heigth
    : masonryEffectHeight[index % masonryEffectHeight.length];

  const backgroundColors = [
    "#016450",
    "#7358ff",
    "#fff57c",
    "#34b5d4",
    "#1e3264",
    "#e8125c",
    "#e1118b",
    "#158a08",
    "#0bd792",
    "#509bf6",
    "#ff8b8a",
    "#e9142a",
    "#3c1860",
  ];

  const backgroundColor = backgroundColors[index % backgroundColors.length];

  const toggleFav = () => {
    setIsFav(!isFav);
  };
  return (
    <View style={[styles.gif]}>
      <Image
        source={{ uri: url }}
        style={[styles.imageGif, { height, backgroundColor, width }]}
      />
      <TouchableOpacity style={styles.favIcon} onPress={toggleFav}>
        <Ionicons name="heart" size={25} color={isFav ? "orange" : "#f9f9f9"} />
      </TouchableOpacity>
    </View>
  );
};

export default Gif;
