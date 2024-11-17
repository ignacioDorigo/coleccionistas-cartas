import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  viewHeader: {
    alignSelf: "flex-start",
    width: "100%",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#C1C1C1",
  },
  header: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "left",
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
    marginTop: 20,
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

  view__switch: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 10,
    paddingBottom: 10,
  },
  view__switch__texto: {
    fontWeight: "bold",
  },
  iconoTrophy: {
    position: "absolute",
    right: 0,
    top: 20,
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
    width: "90%",
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
});
