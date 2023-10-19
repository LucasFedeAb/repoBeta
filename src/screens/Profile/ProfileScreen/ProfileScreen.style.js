import { StyleSheet } from "react-native";
import { colorGreen } from "../../../constants/colors";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  containerImage: {
    borderRadius: 75,
    overflow: "hidden",
  },
  cameraButton: {
    backgroundColor: colorGreen.secondary,
    height: 60,
    width: "80%",
    margin: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  labelButton: {
    color: "white",
  },
});
