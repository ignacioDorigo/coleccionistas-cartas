import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 10,
    padding: 10,
  },

  titulo: {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  subtitulo: {
    alignSelf: "flex-start",
  },
  btnContainer: {
    width: "100%",
    height: 50,
  },
  title: {
    fontSize: 20,
  },

  logo: {
    resizeMode: "contain",
    width: "100%",
    height: 200,
  },
});

export default styles;
