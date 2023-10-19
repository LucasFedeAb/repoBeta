import * as ImagePicker from "expo-image-picker";
import { Image, Pressable, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCameraImage } from "../../../features/authSlice/authSlice";
import { usePostProfileImageMutation } from "../../../services/permissionsApi";
import styles from "./ProfileScreen.style";

const ProfileScreen = ({ navigation }) => {
  const image = useSelector((state) => state.auth.imageCamera);
  const { localId } = useSelector((state) => state.auth);
  const [triggerSaveProfileImage, result] = usePostProfileImageMutation();
  const dispatch = useDispatch();

  const verifyCameraPermissions = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const isCameraOk = await verifyCameraPermissions();

    if (isCameraOk) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [9, 16],
        base64: true,
        quality: 0.4,
      });
      if (!result.canceled) {
        //console.log(result.assets);
        dispatch(
          setCameraImage(`data:image/jpeg;base64,${result.assets[0].base64}`)
        );
      }
    }
  };

  const confirmImage = () => {
    triggerSaveProfileImage({ image, localId });
    //console.log(result);
  };

  const [selectedImage, setSelectedImage] = useState(null);

  let openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to camara roll is required");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    // console.log(pickerResult)

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  return (
    <View style={styles.container}>
      {image ? (
        <Image
          source={{
            uri: image,
          }}
          style={styles.image}
          resizeMode="contain"
        />
      ) : (
        <View style={styles.containerImage}>
          <Image
            source={{
              uri: "https://media3.giphy.com/media/PKl9JTqnoiKtO/200w.webp?cid=ecf05e473z86u1axndx6drlkql0y2palpvh3qw9qcq6wod1m&ep=v1_gifs_search&rid=200w.webp&ct=g",
            }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      )}
      <View style={{ width: "100%" }}>
        <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
          <Text style={styles.labelButton}>Tomar Foto de perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cameraButton} onPress={confirmImage}>
          <Text style={styles.labelButton}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
