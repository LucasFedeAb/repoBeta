import { FlatList, Pressable, View, Text } from "react-native";
import React from "react";
import styles from "./ListGifs.style";
import Gif from "../Gif/Gif";
import { useShareGif } from "../../hooks/useShareGif/useShareGif";

const ListGifs = ({ data }) => {
  const { isSharing, shareGif } = useShareGif();

  const renderGif = ({ item, index }) => {
    return (
      <>
        <Pressable
          style={styles.gifTrending}
          onPress={() => handleShareGif(item.url)}
        >
          <Gif id={item.id} url={item.url} title={item.title} index={index} />
        </Pressable>
      </>
    );
  };

  const handleShareGif = (url) => {
    shareGif(url);
  };

  //const handleScroll = onScroll ? (event) => onScroll(event) : null;

  return (
    <>
      {isSharing && (
        <View style={styles.loaderContainer}>
          <Text style={styles.loaderText}>Compartiendo...</Text>
        </View>
      )}
      <FlatList
        style={styles.container}
        data={data}
        numColumns={2}
        columnWrapperStyle={styles.wrapperStyle}
        keyExtractor={(item) => item.id}
        renderItem={renderGif}
      />
    </>
  );
};

export default ListGifs;
