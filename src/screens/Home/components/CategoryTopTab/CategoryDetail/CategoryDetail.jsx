import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Animated,
  Pressable,
  LogBox,
} from "react-native";
import styles from "./CategoryDetail.style";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {
  useGetCategoriesQuery,
  useGetGifsQuery,
} from "../../../../../services/gifsApi";
import { useShareGif } from "../../../../../hooks/useShareGif/useShareGif";
import Gif from "../../../../../components/Gif/Gif";

const CategoryDetail = ({ category }) => {
  /* const [successDownloadGif, setSuccessDownloadGif] = useState(false);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true) */ /* const [selectedImage, setSelectedImage] = useState(null); */

  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const { data: dataGifs } = useGetGifsQuery();
  const { data: dataCategories } = useGetCategoriesQuery();
  const { isSharing, shareGif } = useShareGif();
  const navigation = useNavigation();

  let dataFilterByCategory = [];
  if (dataGifs) {
    dataFilterByCategory = dataGifs.filter(
      (item) => item.category === category
    );
  }

  const handleAllGifsByTitle = (title) => {
    navigation.navigate("AllGifsTitle", {
      gifs: dataFilterByCategory,
      category,
      title,
    });
  };

  const renderItem = ({ item, index }) => {
    return (
      <Pressable
        style={styles.gifTrending}
        onPress={() => {
          shareGif(item, "Compartir GIF");
        }}
      >
        <Gif url={item} index={index} />
      </Pressable>
    );
  };

  const scrollY = useRef(new Animated.Value(0)).current;
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: currentTheme.backgroundColor },
      ]}
    >
      {isSharing && (
        <View style={styles.loaderContainer}>
          <Text style={styles.loaderText}>Compartiendo...</Text>
        </View>
      )}
      {category != "Tendencias" && (
        <Animated.View
          style={[
            styles.containerCategory,
            {
              backgroundColor: currentTheme.backgroundColor,
              transform: [
                {
                  scale: scrollY.interpolate({
                    inputRange: [0, 150],
                    outputRange: [1, 0.5],
                    extrapolate: "clamp",
                  }),
                },
              ],
              opacity: scrollY.interpolate({
                inputRange: [0, 200],
                outputRange: [1, 0],
                extrapolate: "clamp",
              }),
            },
          ]}
        >
          <Image
            source={{
              uri: dataCategories.find((item) => item.title === category)
                ?.image,
            }}
            style={[
              styles.imageCategory,
              { backgroundColor: currentTheme.backgroundColor },
            ]}
          />
        </Animated.View>
      )}

      {dataFilterByCategory?.map(
        (item, index) =>
          category === "Tendencias" && (
            <View style={styles.trendingContainer} key={item.id}>
              <FlatList
                onScroll={handleScroll}
                scrollEventThrottle={1}
                style={styles.scrollContainer}
                data={item.gifs}
                numColumns={2}
                columnWrapperStyle={styles.wrapperStyle}
                keyExtractor={(item) => item}
                renderItem={({ item, index }) => renderItem({ item, index })}
              />
            </View>
          )
      )}

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
        onScroll={handleScroll}
        scrollEventThrottle={1}
      >
        <View style={styles.gifsPrincipalContainer}>
          {dataFilterByCategory?.map((item) => (
            <View style={styles.containerGifsCharacter} key={item.id}>
              {category !== "Tendencias" && (
                <>
                  <View style={styles.headerListGifs}>
                    <Text
                      style={[styles.title, { color: currentTheme.textColor }]}
                    >
                      {item.title}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleAllGifsByTitle(item.title)}
                    >
                      <Text
                        style={[
                          styles.label,
                          { color: currentTheme.textColor },
                        ]}
                      >{`Ver más`}</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={[styles.gifsContainer, {}]}>
                    {item.gifs.slice(0, 3).map((gif, index) => (
                      <View style={styles.gif} key={index}>
                        <TouchableOpacity
                          onPress={() => {
                            shareGif(gif, "Compartir GIF");
                          }}
                        >
                          <Gif
                            url={gif}
                            index={index}
                            heigth={110}
                            width={110}
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoryDetail;
