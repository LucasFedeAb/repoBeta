import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import styles from "./SavedScreen.style";
import { getFavoriteGifsFromDb } from "../../db";
import { useSelector } from "react-redux";
import ListGifs from "../../components/ListGifs/ListGifs";
import Header from "@components/Header/Header";

const SavedScreen = () => {
  const localId = useSelector((state) => state.auth.localId);
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const favorites = useSelector((state) => state.favorites.favoritesGifs);

  const [favoritesListData, setFavoritesListData] = useState([]);

  useEffect(() => {
    if (localId) {
      getFavoriteGifsFromDb(localId)
        .then((favorites) => {
          const updatedFavoritesList = favorites.map((favorite, index) => ({
            id: favorite.gifId,
            title: favorite.title,
            url: favorite.url,
            index: index,
            isSaved: true,
          }));
          setFavoritesListData(updatedFavoritesList);
        })
        .catch((error) => {
          console.log("Error al obtener los GIFs favoritos:", error);
        });
    }
  }, [localId, favorites]);

  return (
    <>
      <Header title={"Favoritos"} />
      <View
        style={[
          styles.container,
          {
            backgroundColor: currentTheme.backgroundColor,
          },
        ]}
      >
        {favoritesListData.length === 0 && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={{
                color: currentTheme.color,
                textAlign: "center",
                fontSize: 16,
                padding: 4,
              }}
            >
              ¡Tu galería de GIFs favoritos está lista y esperando 📁✨!
            </Text>
          </View>
        )}

        {favoritesListData.length > 0 && <ListGifs data={favoritesListData} />}
      </View>
    </>
  );
};

export default SavedScreen;
