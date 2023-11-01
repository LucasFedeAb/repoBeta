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

  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    //marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalView: {
    width: "90%",
    height: "70%",
    /* margin: 20, */
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 20,
    /* padding: 100, */
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    //position: "relative",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Fondo oscuro semi-transparente
    zIndex: 1500, // Asegura que esté en la parte superior
  },
  loaderText: {
    color: "white",
    fontSize: 18,
  },
});
