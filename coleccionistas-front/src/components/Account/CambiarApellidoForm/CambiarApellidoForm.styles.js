import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    width: "95%",
    height: "auto",
  },
  titulo: {
    fontWeight: "bold",
    textAlign:'center',
    marginBottom:30,
    fontSize:25,
  },
  contenedorBotones: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
  },
  title: {},
  btnContainer: { width: "50%" },
  btnCancelar: { backgroundColor: "red" },
  btnConfirmar: { backgroundColor: "#4EA93B" },
});
