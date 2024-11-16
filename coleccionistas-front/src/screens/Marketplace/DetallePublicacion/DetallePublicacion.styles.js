import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  carouselContainer: {
    position: "relative",
    alignItems: "center",
  },
  carouselImage: {
    width: width,
    height: 370,
    resizeMode: "cover",
  },
  arrow: {
    fontSize: 30,
    color: "#FFFFFF",
    paddingHorizontal: 10,
    zIndex: 1,
    opacity: 0.7,
  },
  arrowLeft: {
    position: "absolute",
    left: 10,
    top: "50%",
    transform: [{ translateY: -15 }],
  },
  arrowRight: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -15 }],
  },
  descripcion: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  descripcionTexto: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  precio: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#8D31D8",
    marginBottom: 15,
  },
  buttonComprar: {
    marginTop: 10,
  },
});
