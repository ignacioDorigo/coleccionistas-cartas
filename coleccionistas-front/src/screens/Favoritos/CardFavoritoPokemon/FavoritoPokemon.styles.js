import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 15,
    padding: 10,
    elevation: 3,
  },

  cardImage: {
    width: "100%",
    height: 350,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: "contain",
  },
  iconoFavoritos: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  iconoCorazonFaltante: {
    color: "#240046",
  },
  iconoCorazonAgregado: {
    color: "#240046",
  },
});
