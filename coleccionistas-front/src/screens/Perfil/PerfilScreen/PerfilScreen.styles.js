import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  datos: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    justifyContent: "center",
    marginVertical: 30,
  },
  avatarContainer: {
    backgroundColor: "#240046",
    justifyContent: "center",
  },
  descripcion: {},
  nombre: {
    fontWeight: "bold",
  },
  btn: {
    marginTop: 30,
    width: "95%",
    alignSelf: "center",
    backgroundColor: "#240046",
  },
});
