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
  camposForm: {
    fontSize: 18,
    marginHorizontal: 10,
    marginBottom: 5,
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
  textArea: {
    padding: 10,
    borderColor: '#C1C1C1',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 10,
    fontSize: 18,
  },
  msjDescripcion: {
    color: 'red', 
    marginBottom: 10,
    marginLeft: 16,
    fontSize: 12,
    marginTop: 5,
  },deleteIconContainer: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "red",
    borderRadius: 15,
    padding: 2,
    zIndex: 1,
  },
  overlayValidando: {
    width: "80%",
    height: "auto",
    borderRadius: 5,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});