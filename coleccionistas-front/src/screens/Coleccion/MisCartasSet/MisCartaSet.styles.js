import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // General container
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5", // Light background for contrast
    justifyContent: "center",
  },
  header__container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#C1C1C1",
  },
  header__title: {
    fontWeight: "bold",
    fontSize: 28,
  },

  scrollView: {
    marginBottom: 10,
  },

  cardContainer: {
    backgroundColor: "#fff", // White background for cards
    borderRadius: 10,
    shadowColor: "#000", // Adding shadow for depth
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
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: "contain",
  },

  highlightedText: {
    padding: 8,
    color: "#fff",
    backgroundColor: "#4caf50", // Green color for highlight
    borderRadius: 5,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },

  noTenes: {
    padding: 8,
    color: "#fff",
    backgroundColor: "#f44336", // Red color for no possession
    borderRadius: 5,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },

  botonesInventario: {
    flexDirection: "row",
    justifyContent: "space-around", // Space buttons evenly
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
