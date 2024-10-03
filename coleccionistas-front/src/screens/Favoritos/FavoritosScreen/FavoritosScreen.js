import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import styles from "./FavoritosScreen.styles";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

export function FavoritosScreen() {
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;
  const [cardsCompletas, setCardsCompletas] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  const buscarCardsCompletas = (favoritos) => {
    const cards = [];
    for (let index = 0; index < favoritos.length; index++) {
      const favorito = favoritos[index];
      axios
        .get(`https://api.pokemontcg.io/v2/cards?q=id:${favorito.id}`)
        .then((response) => {
          cards.push(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(favorito);
    }
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/coleccionistas/misFavoritosPokemon?mail=${mail}`
      )
      .then((response) => {
        setFavoritos(response.data);
      }).then(datos)
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      {favoritos.map((favorito, index) => (
        <Text key={index}>ID DE LA CARD FAVORITA: {favorito.id_card}</Text>
      ))}
    </View>
  );
}
