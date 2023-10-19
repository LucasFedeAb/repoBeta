import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./SearchScreen.style";
import SearchInput from "@components/SearchInput/SearchInput";
import { useSelector, useDispatch } from "react-redux";
import { useGetCategoriesQuery } from "../../services/gifsApi";
import { setCategorySelected } from "../../features/gifsSlice/gifsSlice";
import { useNavigation } from "@react-navigation/native";

const SearchScreen = () => {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const { data: dataCategories, isLoading } = useGetCategoriesQuery();
  const [keyword, setKeyword] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleClickCategory = (categorySelect) => {
    //console.log(categorySelect);
    dispatch(setCategorySelected(categorySelect));
    navigation.navigate("ListGifsNav", { categorySelect: categorySelect });
  };
  const onSearchByKeyword = (keyword) => {
    console.log(keyword);
    setKeyword(keyword);
  };

  const renderItemsCategory = ({ item, index }) => {
    const backgroundColors = [
      "#016450",
      "#7358ff",
      "#1e3264",
      "#e8125c",
      "#e1118b",
      "#158a08",
      "#509bf6",
      "#e9142a",
    ];

    const backgroundColor = backgroundColors[index % backgroundColors.length];

    return (
      <TouchableOpacity
        style={[styles.categoryItem, { backgroundColor }]}
        key={item.title}
        onPress={() => handleClickCategory(item.title)}
      >
        <Text style={styles.titleCategory}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  /* const renderGiphyGifs = () => {
    return (
      <TouchableOpacity
        style={[styles.categoryItem, { backgroundColor }]}
        key={item.title}
        onPress={() => handleClickCategory(item.title)}
      >
        <Text style={styles.titleCategory}>{item.title}</Text>
      </TouchableOpacity>
    );
  }; */

  return (
    <>
      <StatusBar animated={true} style="light" backgroundColor="transparent" />
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: currentTheme.backgroundColor,
          },
        ]}
      >
        <View style={styles.containerSearch}>
          <View style={styles.boxTitle}>
            <Text style={[styles.title, { color: currentTheme.color }]}>
              Buscar
            </Text>
          </View>
          <SearchInput onSearch={setKeyword} />

          <Text style={[styles.subTitle, { color: currentTheme.color }]}>
            Explorar
          </Text>
        </View>
        {isLoading ? (
          <Text>Loading data ...</Text>
        ) : (
          <FlatList
            data={dataCategories}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapperStyle}
            keyExtractor={(item) => item.title}
            renderItem={({ item, index }) =>
              renderItemsCategory({ item, index })
            }
          />
        )}
        {/* <View style={{ flexDirection: "row", height: 200, width: "100%" }}>
          {category && (
            <>
              <Text>adsasddasd</Text>
              <FlatList
                data={extractedData}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapperStyle}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Image
                    style={[styles.gifImage, { width: 150, height: 100 }]}
                    source={{ uri: item.url }}
                  />
                )}
              />
            </>
          )}
        </View> */}
      </SafeAreaView>
    </>
  );
};

export default SearchScreen;
