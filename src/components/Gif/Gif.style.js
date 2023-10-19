import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  gif: {
    borderRadius: 20,
    overflow: "hidden",
  },
  imageGif: {
    position: "relative",
    width: 160,
    margin: 5,
    zIndex: 1,
  },
  favIcon: {
    position: "absolute",
    right: 8,
    top: 8,
    zIndex: 2,
  },
});
