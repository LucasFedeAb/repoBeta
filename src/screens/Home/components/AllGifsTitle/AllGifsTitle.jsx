import React from "react";
import { View, Image, FlatList } from "react-native";
import styles from "./AllGifsTitle.style";
import Header from "@components/Header/Header";
import Gif from "../../../../components/Gif/Gif";
import { useSelector } from "react-redux";

const AllGifsTitle = ({ route }) => {
  const { gifs, title } = route.params || { gifs: [] };
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const currentTheme = useSelector((state) => state.theme.currentTheme);

  const filteredGifsByTitle = gifs.filter((item) => item.title === title);

  const uniqueGifs = [];

  for (const item of filteredGifsByTitle) {
    for (const gif of item.gifs) {
      const isDuplicate = uniqueGifs.some((uniqueGif) => uniqueGif === gif);

      {
        !isDuplicate && uniqueGifs.push(gif);
      }
    }
  }

  const renderItem = ({ item, index }) => (
    <Gif url={item} id={item} index={index} width={120} heigth={180} />
  );
  /* const renderItem = ({ item }) => (
    <View style={styles.gif}>
      <Image source={{ uri: item }} style={styles.imageGif} />
    </View>
  ); */

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: currentTheme.backgroundColor },
      ]}
    >
      <Header title={title} />
      <FlatList
        data={uniqueGifs}
        numColumns={3}
        columnWrapperStyle={styles.wrapperStyle}
        renderItem={renderItem}
        keyExtractor={(gif, index) => gif}
      />
    </View>
  );
};

export default AllGifsTitle;
