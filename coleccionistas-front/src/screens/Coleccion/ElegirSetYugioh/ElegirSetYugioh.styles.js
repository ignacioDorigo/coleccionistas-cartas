import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 15,
    backgroundColor: "#F3F4F6",
  },
  padding: {
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  header__view: {
    alignSelf: "flex-start",
    width: "100%",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#C1C1C1",
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
    marginRight: 15,
    borderRadius: 12,
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
  tengoSet: {
    borderColor: "green",
    backgroundColor: "rgba(0, 255, 0, 0.3)",
  },
  noTengoSet: {
    borderColor: "#FFF",
    // backgroundColor: "rgba(128, 128, 128, 0.3)"
  },
  view__switch: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  view__switch__texto: {
    fontWeight: "bold",
  },
});
