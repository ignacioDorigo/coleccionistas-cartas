import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  viewHeader: {
    alignSelf: "flex-start",
    width: "100%",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#C1C1C1",
  },
  header: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "left",
  },
  touchable: {
    flexDirection: "row",
    backgroundColor: "#fff", 
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    width: "100%",
    shadowRadius: 4,
    marginBottom: 15,
    padding: 10,
    elevation: 3,
    alignItems:'center',
  },
  image: {
    flex: 2,
    width: "100%",
    resizeMode: "contain",
    height: 40,
  },
});
