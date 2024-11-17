import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 10,
    backgroundColor: "#F3F4F6",
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
    width: "90%",
    alignSelf: "center",
  },
  publicacionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  publicacionDetail: {
    fontSize: 15,
    fontWeight: "400",
    color: "#666",
    marginBottom: 8,
    lineHeight: 20,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4CAF50",
    marginBottom: 8,
  },
  estadoText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2E7D32", // Verde oscuro para el texto
    marginBottom: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: "#E8F5E9", // Verde claro para el fondo
    alignSelf: "flex-start",
  },
  carouselContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingVertical: 10,
  },
  carouselImage: {
    width: width / 1.6,
    height: 200,
    resizeMode: "cover",
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
    marginTop: 10,
    textAlign: "center",
  },
  iconCancel: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  titleIcon: {
    display: "flex",
    flexDirection: "row",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  imagenAmpliada: {
    width: width - 40,
    height: height / 1.5,
    resizeMode: "contain",
  },
});

export default styles;
