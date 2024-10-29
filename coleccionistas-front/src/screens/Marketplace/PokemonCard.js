import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

export default function PokemonCard(props) {
  const { card } = props;
  console.log(card);

  return (
    <View style={styles.container}>
      <Image source={{ uri: card.images.large }} style={styles.image} />
      <View style={styles.detalle}>
        <Text>{card.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 10,
    height: 300,
    backgroundColor: "red",
    padding: 5,
  },
  image: {
    flex: 2,
    height: 300,
    resizeMode: "contain",
  },
  detalle: {
    flex: 1,
    alignSelf: "flex-start",
  },
});
