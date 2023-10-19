import { Text, View, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import styles from "./ListGifsScreen.style";
import { useGetGiphyByCategoryQuery } from "../../../../services/giphyApi";
import { useSelector, useDispatch } from "react-redux";
import { setDataGiphy } from "../../../../features/gifsSlice/gifsSlice";
import Header from "@components/Header/Header";
import ListGifs from "../../../../components/ListGifs/ListGifs";

const ListGifsScreen = ({ route }) => {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const category = useSelector((state) => state.gifs.categorySelected);
  const giphyGifsData = useSelector((state) => state.gifs.dataGiphy);

  //console.log(category);
  const dispatch = useDispatch();

  //console.log("giphyGifsData", giphyGifsData);
  const { data: dataGiphyByCategory, isLoading: loadingGiphyByCategory } =
    useGetGiphyByCategoryQuery(category);

  if (category && !loadingGiphyByCategory) {
    dispatch(setDataGiphy(dataGiphyByCategory));
  }

  let giphyData;
  if (!loadingGiphyByCategory) {
    //console.log("data ListScreen: ", dataGiphyByCategory);
    giphyData = giphyGifsData?.map((gif, index) => ({
      id: gif.id,
      title: gif.title,
      url: gif.images.fixed_height.url,
      index: index,
    }));
  }
  console.log("categoriaaa: ", category);

  return (
    <>
      <StatusBar
        animated={true}
        style="light"
        backgroundColor="transparent"
      />
      <Header title={category} />
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: currentTheme.backgroundColor },
        ]}
      >
        {giphyData && <ListGifs data={giphyData} />}
      </SafeAreaView>
    </>
  );
};

export default ListGifsScreen;
