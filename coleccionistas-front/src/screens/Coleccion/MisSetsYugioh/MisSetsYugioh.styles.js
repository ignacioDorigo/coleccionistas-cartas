import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 15,
    backgroundColor: "#F3F4F6",
  },
  header__view: {
    alignSelf: "flex-start",
    width: "100%",
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: "#C1C1C1",
    marginBottom: 20,
  },
  header__title: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "left",
  },
  header_subtitle: {},
  imageSet: {
    width: 100,
    height: 150,
    resizeMode: "contain",
    borderRadius: 8,
    marginRight: 15,
  },
  setContainer: {
    flexDirection: "row",
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
  },
  setName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 3,
  },
  setNumCards: {
    fontSize: 14,
    fontWeight: "400",
    color: "#666",
    marginBottom: 8,
    lineHeight: 20,
  },
  setTextContainer: {
    flex: 1,
  },
  iconEliminar: {
    position: "absolute",
    right: 0,
    top: 0,
  },
});
