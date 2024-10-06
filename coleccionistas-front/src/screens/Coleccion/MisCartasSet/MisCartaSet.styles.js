import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // General container
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5", // Light background for contrast
    justifyContent: 'center',
  },

  title: {
    fontWeight: "bold",
    fontSize: 28,
    marginBottom: 15,
    textAlign: "center",
    color: "#333", // Darker text for better readability
  },
  
  scrollView: {
    marginBottom: 20,
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
    gap:10,
  },

  btnAgregar: {
    flex: 1,
    marginRight: 5, // Spacing between buttons
    backgroundColor: "#4caf50",
    borderRadius: 5,
  },
  
  btnEliminar: {
    flex: 1,
    marginLeft: 5, // Spacing between buttons
    backgroundColor: "#f44336",
    borderRadius: 5,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  iconoFavoritos:{
    position:'absolute',
    right:0,
    top:0,
  }
});
