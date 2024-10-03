import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import styles from "./MarketPlaceScreen.styles";
import { Icon } from "@rneui/themed";
import axios from "axios";
import PokemonCard from "../PokemonCard";

export function MarketPlaceScreen() {
  const [buscador, setBuscador] = useState("");
  const [cartas, setCartas] = useState([]);

  const renderItem = ({ item }) => <PokemonCard card={item} />;

  const buscarCartas = () => {
    axios
      .get(`https://api.pokemontcg.io/v2/cards?q=name:${buscador}`)
      .then((response) => {
        console.log(response.data.data[0]);
        setCartas(response.data.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          placeholder="Buscar....."
          style={styles.input}
          autoCapitalize="none"
          onChangeText={(dato) => setBuscador(dato)}
        ></TextInput>
        <TouchableOpacity>
          <Icon
            type="material-community"
            name="magnify"
            iconStyle={styles.icon}
            onPress={buscarCartas}
          />
        </TouchableOpacity>
      </View>
      <ScrollView  contentContainerStyle={styles.scroll}>
      {cartas.map((carta, index) => (
        <PokemonCard card={carta} key={index} />
      ))}
      </ScrollView >
    </View>
  );
}
