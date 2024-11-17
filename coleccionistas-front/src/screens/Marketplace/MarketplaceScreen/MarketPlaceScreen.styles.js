import { StyleSheet, Dimensions } from "react-native";

// Obtener el ancho de la pantalla
const windowWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 10,
    padding: 10,
    backgroundColor: "#F3F4F6",
  },
  searchBar: {
    marginTop: 20,
    width: "95%",
    height: 40,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
  },
  input: {
    flex: 4,
    fontSize: 16,
    paddingHorizontal: 10,
    borderBottomColor: "red",
  },
  icon: {
    backgroundColor: "#8D31D8",
    flex: 1,
    height: "100%",
    justifyContent: "center",
    borderEndEndRadius: 10,
    borderTopRightRadius: 10,
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
  carouselContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingVertical: 10,
    width: "100%",
  },
  carouselImage: {
    width: "80%",
    height: 270,
    resizeMode: "cover",
    marginHorizontal: 10,
    borderRadius: 10,
    borderColor: "#DDD",
    borderWidth: 1,
  },
  arrow: {
    // position: 0,
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
  iconEdit: {
    position: "absolute",
    right: 40,
    top: 10,
  },
});

export default styles;
