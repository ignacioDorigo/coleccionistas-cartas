import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView, ActivityIndicator, Alert } from "react-native";
import { Button, Icon } from "@rneui/themed";
import { AuthContext } from "../../../context/AuthContext";
import { RecargarContext } from "../../../context/RecargarContext";
import PokemonCard from "../../../components/PokemonCard";
import axios from "axios";
import { styles } from "./FavoritosScreen.styles";
import { ipHost } from "../../../utils/ipHost";
import { FavoritoPokemon } from "../CardFavoritoPokemon/FavoritoPokemon";

// `https://api.pokemontcg.io/v2/cards?q=id:${id_card}`
// );
// return respuesta.data.data[0];

export function FavoritosScreen() {
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;
  const { favoritos } = useContext(RecargarContext);
  const [misFavoritosIdsPokemon, setMisFavoritosIdsPokemon] = useState([]);
  const [misFavoritosIdsYugioh, setMisFavoritosIdsYugioh] = useState([]);
  const { recargarFavoritos } = useContext(RecargarContext);

  useEffect(() => {
    buscarMisFavoritosYugioh();
    buscarMisFavoritosPokemon();
  }, [favoritos]);

  const buscarMisFavoritosYugioh = async () => {
    try {
      const response = await axios.get(
        `http://${ipHost}:8080/coleccionistas/misFavoritosYugioh?mail=${mail}`
      );
      const misFavoritos = response.data;
      const misFavoritosIdsss = misFavoritos.map(
        (favorito) => favorito.id_card
      );
      setMisFavoritosIdsYugioh(misFavoritosIdsss);
      // console.log("Mis favoritos YUGIOH");
      // console.log(misFavoritosIdsss);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const buscarMisFavoritosPokemon = async () => {
    try {
      const response = await axios.get(
        `http://${ipHost}:8080/coleccionistas/misFavoritosPokemon?mail=${mail}`
      );
      const misFavoritos = response.data;
      const misFavoritosIdsss = misFavoritos.map(
        (favorito) => favorito.id_card
      );
      setMisFavoritosIdsPokemon(misFavoritosIdsss);
      // console.log("Mis favoritos POKEMON");
      // console.log(misFavoritosIdsss);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header__view}>
        <Text style={styles.header__title}>Favoritos</Text>
        <Text style={styles.header_subtitle}>
          Estas son todas las cartas que te gustaron
        </Text>
      </View>
      {misFavoritosIdsPokemon.map((favorito, index) => (
        <FavoritoPokemon
          idPokemon={favorito}
          key={index}
          misFavoritosIdsPokemon={misFavoritosIdsPokemon}
          recargarFavoritos={recargarFavoritos}
          mail={mail}
        />
      ))}
    </ScrollView>
  );
}
