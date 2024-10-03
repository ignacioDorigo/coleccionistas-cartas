import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "#fff",
  },
  search: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },

  input: {
    padding: 10,
    borderWidth: 2,
    borderColor: "#c1c1c1",
    flex: 10,
    borderRadius: 5,
  },
  icon: {
    padding: 10,
    backgroundColor: "#8D31D8",
    color: "#FFF",
    borderRadius: 5,
  },
  scroll:{
    // flex:2,
    backgroundColor:"blue",
    justifyContent:'center',
    alignContent:'center',
  }
});

export default styles;
