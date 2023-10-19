import { StyleSheet } from "react-native";
import { spacing } from "../../../../../constants/spacing";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  title: {
    fontSize: 14,
    marginBottom: spacing.s,
  },
  label: {
    fontSize: 12,
    marginBottom: spacing.s,
  },
  containerCategory: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    borderRadius: 16,
    /* paddingTop: 4, */
  },

  imageCategory: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    opacity: 0.9,
    /* borderBottomRightRadius: 150,
    borderBottomLeftRadius: 150, */
    resizeMode: "contain",
  },
  scrollContainer: {
    width: "100%",
    zIndex: 3,
  },
  gifsPrincipalContainer: {
    width: "100%",
    marginTop: 230,
    paddingHorizontal: spacing.s,
  },
  containerGifsCharacter: {
    marginVertical: spacing.l,
  },
  gifsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gif: {
    borderRadius: 10,
    overflow: "hidden",
  },

  imageGif: {
    width: 110,
    height: 110,
  },
  headerListGifs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  trendingContainer: {
    width: "100%",
    marginVertical: 8,
  },
  flat: {
    width: "100%",
  },
  wrapperStyle: {
    justifyContent: "space-around",
    /* alignSelf: "stretch", */
  },
  gifTrending: {
    margin: 0,
  },

  imageGifTrendigs: {
    width: 175,
    margin: 5,
  },
  video: {
    flex: 1,
    width: "100%",
    height: 150,
    borderRadius: 10,
  },

  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 999,
  },
  loaderText: {
    color: "white",
    fontSize: 18,
  },
});
