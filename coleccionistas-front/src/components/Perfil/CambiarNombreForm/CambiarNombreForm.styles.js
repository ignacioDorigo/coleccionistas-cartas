import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    width: "95%",
    height: "auto",
    borderRadius:5,
  },
  titulo: {
    fontWeight: "bold",
    textAlign:'center',
    marginBottom:30,
    fontSize:20,
  },
  contenedorBotones: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
  },
  title: {},
  btnContainer: { width: "100%" },
  btnConfirmar: { backgroundColor: "#8D31D8" },
});
