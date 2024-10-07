import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView, ActivityIndicator, Alert } from "react-native";
import { Button, Icon } from "@rneui/themed";
import { AuthContext } from "../../../context/AuthContext";
import { RecargarContext } from "../../../context/RecargarContext";
import PokemonCard from "../../../components/PokemonCard";
import axios from "axios";
import { styles } from "./FavoritosScreen.styles";

export function FavoritosScreen() {
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;

  const { favoritos } = useContext(RecargarContext);

  const [pokemones, setPokemones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eliminarFav, setEliminarFav] = useState(false);

  const eliminar = () => {
    setEliminarFav((prevState) => !prevState);
  };

  useEffect(() => {
    buscarPokemones();
  }, [favoritos, eliminarFav]);

  const buscarPokemones = async () => {
    setLoading(true);
    try {
      // Primero buscamos los IDS DE LOS FAVORITOS
      const response = await axios.get(
        `http://192.168.1.14:8080/coleccionistas/misFavoritosPokemon?mail=${mail}`
      );
      const ids = response.data;

      // Despues buscamos cada detalle de cada carta favorita
      const objetos = await Promise.all(
        ids.map(async (element) => {
          const { id_card } = element;
          const respuesta = await axios.get(
            `https://api.pokemontcg.io/v2/cards?q=id:${id_card}`
          );
          return respuesta.data.data[0];
        })
      );

      setPokemones(objetos);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        "Hubo un problema al buscar los pokemones favoritos."
      );
    } finally {
      setLoading(false); // Asegúrate de que el loading se apague en caso de error también
    }
  };

  const eliminarCardFavorito = async (id) => {
    try {
      const response = await axios.delete(
        `http://192.168.1.14:8080/coleccionistas/eliminarFavoritoPokemon?idCard=${id}&mail=${mail}`
      );
      Alert.alert("Éxito", response.data);
      eliminar();
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        error.response?.data || "Hubo un problema al eliminar el favorito."
      );
    }
  };

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>

          <View style={styles.viewHeader}>
            <Text style={styles.header}>Tus Cartas Favoritas</Text>
          </View>

          {pokemones.map((pokemon, index) => (
            <View key={index} style={styles.touchable}>
              <PokemonCard card={pokemon} />
              <Button
                title="Eliminar de Favoritos"
                onPress={() => eliminarCardFavorito(pokemon.id)}
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                icon={<Icon type="material-community" name="delete" color={"#FFFFFF"}/>}
              />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
