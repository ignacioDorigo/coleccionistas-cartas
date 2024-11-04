import { StyleSheet } from "react-native";

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
    color: "#FF7043",
    marginBottom: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: "#FFE6E1",
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
    width: 250,
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
    right:10,
    top:10,
  },
});

export default styles;
