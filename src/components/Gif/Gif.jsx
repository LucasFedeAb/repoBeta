import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Pressable,
  Modal,
} from "react-native";
import styles from "./Gif.style";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
} from "../../features/favoritesSlice/favoritesSlice";
import {
  addFavoriteGifFromDb,
  removeFavoriteGifFromDb,
  getFavoriteGifsFromDb,
} from "../../db";
import { useShareGif } from "../../hooks/useShareGif/useShareGif";

const Gif = ({
  id,
  url,
  title,
  index,
  width = width || 175,
  heigth,
  isSaved,
}) => {
  const dispatch = useDispatch();
  const localId = useSelector((state) => state.auth.localId);
  const favorites = useSelector((state) => state.favorites.favoritesGifs);
  const { shareGif } = useShareGif();

  const [modalVisible, setModalVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleModal = () => {
    setModalVisible(true);
  };

  const handleShareGif = () => {
    shareGif(url);
  };

  const handleAddGif = () => {
    dispatch(addFavorite(url, localId, id, title));
    addFavoriteGifFromDb(url, localId, id, title);
    setIsFavorite(true);
  };

  const handleRemoveGif = () => {
    dispatch(removeFavorite(url, localId, id, title));
    removeFavoriteGifFromDb(url, localId, id, title);
    setIsFavorite(false);
  };

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

  useEffect(() => {
    if (localId) {
      getFavoriteGifsFromDb(localId)
        .then((favorites) => {
          const updatedFavoritesList = favorites.map((favorite) => ({
            id: favorite.gifId,
            title: favorite.title,
            url: url,
          }));

          setIsFavorite(
            updatedFavoritesList.some(
              (favorite) => favorite.id === id && favorite.url === url
            )
          );
          /* setIsFavorite(
            updatedFavoritesList.includes(favorite.url && favorite.id)
          ); */
        })
        .catch((error) => {
          console.log("Error al obtener los GIFs favoritos:", error);
        });
    }
  }, [localId, favorites]);

  const memoizedGifImage = useMemo(() => {
    return (
      <Image
        source={{ uri: url }}
        style={[styles.imageGif, { height, backgroundColor, width }]}
      />
    );
  }, [url, height, backgroundColor, width]);

  return (
    <>
      {modalVisible && (
        <Modal
          animationType="fade"
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image
                source={{ uri: url }}
                resizeMode="stretch"
                style={{
                  width: "90%",
                  height: 350,
                  padding: 4,
                  marginTop: 45,
                  borderRadius: 20,
                }}
              />
              <View>
                <Text style={{ color: "#fff", paddingTop: 24 }}>{title}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  gap: 24,
                }}
              >
                <View>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      /* backgroundColor: "#ccc", */
                      borderRadius: 5,
                      color: "#fff",
                    }}
                    onPress={() => handleShareGif(url)}
                  >
                    <View>
                      <Text style={{ marginHorizontal: 8, color: "#fff" }}>
                        Compartir Gif
                      </Text>
                    </View>
                    <Ionicons
                      name="share-social-sharp"
                      size={30}
                      color="skyblue"
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                    }}
                    onPress={isFavorite ? handleRemoveGif : handleAddGif}
                  >
                    <Ionicons
                      name="heart"
                      size={30}
                      color={isFavorite ? "darkorange" : "#fff"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={styles.favIcon}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Ionicons name="close" size={40} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      <View style={[styles.gif]}>
        <Pressable style={styles.gifTrending} onPress={handleModal}>
          {memoizedGifImage}
        </Pressable>

        {isSaved ? (
          <TouchableOpacity style={styles.favIcon} onPress={handleRemoveGif}>
            <Ionicons name="trash" size={25} color="red" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.favIcon}
            onPress={isFavorite ? handleRemoveGif : handleAddGif}
          >
            <Ionicons
              name="heart"
              size={25}
              color={isFavorite ? "darkorange" : "lightgray"}
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default Gif;
