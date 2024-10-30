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
    width:"100%",
    gap:0,
  },

  btnContainer:{
    width:"100%",
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


  iconoFavoritos:{
    position:'absolute',
    right:0,
    top:0,
  },
  iconoTrophy:{
    position:'absolute',
    right:0,
    top:60,
  },
  viewSwitch:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:20,
  },
  searchBar: {
    marginBottom: 10,
    backgroundColor: "#fff", // White background for search bar
    borderRadius: 10,
    height: 35,
    borderColor: "#ddd", // Light gray border
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  suggestionsList: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    maxHeight: 150, // Altura máxima para la lista de sugerencias
    marginBottom: 10,
    alignSelf: "flex-start", // Permite que la lista se ajuste automáticamente
    overflow: "hidden",
    width: "100%",
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
