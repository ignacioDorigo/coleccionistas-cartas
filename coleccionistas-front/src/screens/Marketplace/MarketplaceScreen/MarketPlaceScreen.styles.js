import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  searchBar: {
    marginTop: 20,
    width: "95%",
    height: 40,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
  },
  input: {
    flex: 4,
    margin: 0,
    padding: 0,
    width: "100%",
    borderBottomColor: "red",
    fontSize: 16,
    paddingHorizontal: 10,
  },
  icon: {
    backgroundColor: "#8D31D8",
    flex: 1,
    height: "100%",
    justifyContent: "center",
    borderEndEndRadius: 10,
    borderTopRightRadius: 10,
  },
  publicaciones: {
    width: "100%",
  },
  publicacionContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#DDD",
    width: "100%",
  },
  carouselContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  carouselImage: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginHorizontal: 10,
    borderRadius: 10,
  },
  arrow: {
    fontSize: 30,
    color: "#8D31D8",
    paddingHorizontal: 10,
  },
  
});

export default styles;
