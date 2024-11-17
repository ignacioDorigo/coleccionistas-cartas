import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // General container
  container: {
    gap: 10,
    padding: 15,
    backgroundColor: "#F3F4F6",
  },
  header__container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#C1C1C1",
  },
  header__view: {
    alignSelf: "flex-start",
    width: "100%",
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: "#C1C1C1",
  },
  header__title: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "left",
  },
  header_subtitle: {},

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
    alignSelf: "center",
    width: "100%",
  },

  imageCard: {
    width: 260,
    height: 380,
    resizeMode: "contain",
    // resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 10,
  },

  botonesInventario: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    width: "100%",
    gap: 0,
  },

  btnContainer: {
    width: "100%",
  },

  btnAgregar: {
    marginRight: 5, // Spacing between buttons
    backgroundColor: "#4caf50",
    borderRadius: 5,
  },

  btnEliminar: {
    marginLeft: 5, // Spacing between buttons
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
  viewSwitch: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  iconSearch: {
    paddingHorizontal: 5,
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#fff",
    height: 35,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  suggestionsList: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    maxHeight: 150,
    marginBottom: 10,
    width: "100%",
    overflow: "hidden",
  },
  suggestionItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 14,
    color: "#555",
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
});
