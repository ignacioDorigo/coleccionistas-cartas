import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 15,
    backgroundColor: "#F3F4F6",
  },
  imageCard: {
    width: 260,
    height: 380,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 10,
  },
  cardContainer: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
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
  textContainer: {
    width: "100%",
    marginTop: 10,
  },
  textLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  textValue: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  cardGreen: {
    borderColor: "green",
    borderWidth: 2,
    padding: 10,
    margin: 5,
  },
  cardRed: {
    borderColor: "red",
    borderWidth: 2,
    padding: 10,
    margin: 5,
  },
  textGreen: {
    color: "green",
    fontWeight: "bold",
  },
  textRed: {
    color: "red",
    fontWeight: "bold",
  },
  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  overlayBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  modalImageContainer: {
    width: "90%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: "100%",
  },
  btnContainer: {
    width: "100%",
  },

  btnAgregar: {
    backgroundColor: "#4caf50",
    borderRadius: 5,
  },

  btnEliminar: {
    backgroundColor: "#f44336",
    borderRadius: 5,
  },
  iconoTrophy: {
    position: "absolute",
    right: 0,
    top: 20,
  },
});
