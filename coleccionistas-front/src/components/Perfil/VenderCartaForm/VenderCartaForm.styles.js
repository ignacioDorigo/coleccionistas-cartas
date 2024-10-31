import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    width: "95%",
    height: "auto",
    borderRadius: 5,
  },
  titulo: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    fontSize: 20,
  },
  inputContainer: {
    marginBottom: -10,
  },
  btnStyle: {
    backgroundColor: "#8D31D8",
  },
  btnConfirmar: {
    marginTop: 5,
  },

  checkbox: {
    marginLeft: 0,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  columnWrapper: {
    justifyContent: "space-between", // Para espacio entre columnas
    gap: 20,
    marginBottom: 10, // Espacio entre filas
  },
});
