import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  viewSinCompra: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F3F4F6",
  },
  publicaciones: {
    width: "100%",
  },
  publicacionContainer: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    borderColor: "#DDD",
    borderWidth: 1,
  },
  publicacionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  publicacionDetail: {
    fontSize: 15,
    color: "#666",
    marginBottom: 8,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4CAF50",
    marginBottom: 8,
  },
  carouselContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  carouselImage: {
    width: "80%",
    height: 270,
    resizeMode: "contain",
    borderRadius: 10,
    borderColor: "#DDD",
    borderWidth: 1,
  },
  arrow: {
    fontSize: 30,
    color: "#8D31D8",
    paddingHorizontal: 10,
  },
  noImagesText: {
    fontStyle: "italic",
    color: "#999",
    textAlign: "center",
  },
  sinCompras: {
    fontSize: 18,
    color: "#333",
  },
  vendedorText: {
    marginVertical: 0,
    fontSize: 16,
    color: "#555", // Puedes cambiar el color según el diseño
    fontWeight: "bold",
    marginBottom: 5,
  },
  publicacionEmail: {
    fontSize: 15,
    color: "blue",
    fontWeight: "light",
  },
});
