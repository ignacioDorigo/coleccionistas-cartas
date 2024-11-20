import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 15,
    backgroundColor: "#F3F4F6",
  },
  header__view: {
    alignSelf: "flex-start",
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#C1C1C1",
  },
  header__title: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "left",
  },
  header_subtitle: {},
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
  iconoBtn: {
    marginRight: 10,
    color: "#FFF",
  },
  btnAgregar: {
    backgroundColor: "#4caf50",
    borderRadius: 5,
  },

  btnEliminar: {
    backgroundColor: "#f44336",
    borderRadius: 5,
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
  iconoTrophy: {
    position: "absolute",
    right: 0,
    top: 60,
  },
  view__switch: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  view__switch__texto: {
    fontWeight: "bold",
  },
});
