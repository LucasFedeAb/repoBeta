import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Pressable,
  Modal,
  Alert,
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
  resetAllFavorites,
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
  const { isSharing, shareGif } = useShareGif();
  const [modalVisible, setModalVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleModal = (url) => {
    setModalVisible(true);
  };

  const handleShareGif = (url) => {
    shareGif(url);
  };

  const toggleFav = () => {
    const gifId = id;
    if (isFavorite) {
      console.log("Removing from favorites:", gifId);
      dispatch(removeFavorite(url, localId, gifId, title));
      removeFavoriteGifFromDb(url, localId, gifId, title);
      setIsFavorite(false);
    } else {
      console.log("Adding to favorites:", gifId);
      dispatch(addFavorite(url, localId, gifId, title));
      addFavoriteGifFromDb(url, localId, gifId, title);
      setIsFavorite(true);
    }
  };

  const handleAddGif = () => {
    const gifId = id;
    console.log("Adding to favorites:", gifId);
    dispatch(addFavorite(url, localId, gifId, title));
    addFavoriteGifFromDb(url, localId, gifId, title);
    setIsFavorite(true);
  };

  const handleRemoveGif = () => {
    const gifId = id;
    dispatch(removeFavorite(url, localId, gifId, title));
    removeFavoriteGifFromDb(url, localId, gifId, title);
    setIsFavorite(false);
  };

  useEffect(() => {
    if (localId) {
      getFavoriteGifsFromDb(localId)
        .then((favorites) => {
          const updatedFavoritesList = favorites.map((favorite, index) => ({
            id: favorite.gifId,
            title: favorite.title,
            url: url,
            index: index,
            isSaved: true,
          }));

          setIsFavorite(
            updatedFavoritesList.some(
              (favorite) => favorite.id === id && favorite.url === url
            )
          );
        })
        .catch((error) => {
          console.log("Error al obtener los GIFs favoritos:", error);
        });
    }
  }, [localId, favorites]);

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

  return (
    <>
      {isSharing && (
        <View style={styles.loaderContainer}>
          <Text style={styles.loaderText}>Compartiendo...</Text>
        </View>
      )}
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
                      color={isFavorite ? "orange" : "#fff"}
                    />
                  </TouchableOpacity>
                </View>

                {/* <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable> */}
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
        <Pressable style={styles.gifTrending} onPress={() => handleModal(url)}>
          <Image
            source={{ uri: url }}
            style={[styles.imageGif, { height, backgroundColor, width }]}
          />
        </Pressable>

        {isSaved && (
          <TouchableOpacity style={styles.favIcon} onPress={handleRemoveGif}>
            <Ionicons name="trash" size={25} color="red" />
          </TouchableOpacity>
        )}
        {!isSaved && (
          <TouchableOpacity
            style={styles.favIcon}
            onPress={isFavorite ? handleRemoveGif : handleAddGif}
          >
            <Ionicons
              name="heart"
              size={25}
              color={isFavorite ? "orange" : "#f9f9f9"}
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default Gif;
