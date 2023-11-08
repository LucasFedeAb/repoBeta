import { Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./SavedScreen.style";
import { getFavoriteGifsFromDb, resetAllFavorites } from "../../db";
import { useSelector, useDispatch } from "react-redux";
import { CustomModal, Header, ListGifs, Loader } from "@components";

const SavedScreen = () => {
  const dispatch = useDispatch();
  const localId = useSelector((state) => state.auth.localId);
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const favorites = useSelector((state) => state.favorites.favoritesGifs);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const [favoritesListData, setFavoritesListData] = useState([]);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const modalContent = () => {
    return (
      <View style={styles.modalContent}>
        <Text style={styles.titleModal}>
          ¿Desea eliminar todos los favoritos?
        </Text>

        <View style={styles.containerButtonsModal}>
          <TouchableOpacity
            onPress={handleResetFavorites}
            style={styles.buttonModalDelete}
          >
            <Text style={styles.labelButtonModal}>Eliminar Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={closeModal}
            style={styles.buttonModalCancel}
          >
            <Text style={styles.labelButtonModal}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  useEffect(() => {
    if (localId) {
      getFavoriteGifsFromDb(localId)
        .then((favorites) => {
          console.log("favoritesDB", favorites);
          const updatedFavoritesList = favorites.map((favorite, index) => ({
            id: favorite.gifId,
            title: favorite.title,
            url: favorite.url,
            index: index,
            isSaved: true,
          }));
          dispatch(setFavoritesListData(updatedFavoritesList));
        })
        .catch((error) => {
          console.log("Error al obtener los GIFs favoritos:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
    }
  }, [localId, favorites]);

  const handleResetFavorites = async () => {
    try {
      const rowsAffected = await resetAllFavorites();
      console.log(`Se eliminaron ${rowsAffected} favoritos.`);
      dispatch(setFavoritesListData([]));
    } catch (error) {
      console.error("Error al restablecer los favoritos:", error);
    }
    closeModal();
  };

  return (
    <>
      <Header title={"Mis Favoritos"} onPress={openModal} />
      <View
        style={[
          styles.container,
          {
            backgroundColor: currentTheme.backgroundColor,
          },
        ]}
      >
        <CustomModal
          visible={modalVisible}
          onClose={closeModal}
          content={modalContent}
        />
        {isLoading && <Loader />}
        {!isLoading && favoritesListData.length === 0 && (
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
