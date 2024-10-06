import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView, ActivityIndicator, Alert } from "react-native";
import { Button, Icon } from "@rneui/themed";
import { AuthContext } from "../../../context/AuthContext";
import { RecargarContext } from "../../../context/RecargarContext";
import PokemonCard from "../../../components/PokemonCard";
import axios from "axios";
import styles from "./FavoritosScreen.styles";

export function FavoritosScreen() {
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;

  const { favoritos } = useContext(RecargarContext);

  const [ids, setIds] = useState([]);
  const [pokemones, setPokemones] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [eliminarFav, setEliminarFav] = useState(false);

  const eliminar = () => {
    return setEliminarFav((prevState) => !prevState);
  };

  useEffect(() => {
    buscarMisFavoritos();
  }, [favoritos, eliminarFav]);

  const buscarMisFavoritos = async () => {
    setLoading(true); // Iniciar el indicador de carga
    console.log("BUSCANDO MIS FAVORITOS");
    buscarIds();
    // IDS DE MIS FAVORITOS
    console.log(ids);
    await buscarPokemones();
    setLoading(false);
  };

  const buscarIds = async () => {
    const response = await axios.get(`http://192.168.1.14:8080/coleccionistas/misFavoritosPokemon?mail=${mail}`);
    setIds(response.data);
  };

  const buscarPokemones = async () => {
    const objetos = [];
    for (let index = 0; index < ids.length; index++) {
      const element = ids[index];
      const { id_card } = element;
      const respuesta = await axios.get(`https://api.pokemontcg.io/v2/cards?q=id:${id_card}`);
      const objeto = respuesta.data.data[0];
      objetos.push(objeto);
    }
    setPokemones(objetos);
};

  const eliminarCardFavorito = async (id) => {
    try {
      const response = await axios.delete(
        `http://192.168.1.14:8080/coleccionistas/eliminarFavoritoPokemon?idCard=${id}&mail=${mail}`
      );
      Alert.alert("Exito", response.data);
      eliminar();
    } catch (error) {
      Alert.alert("Error", error.response.data);
    }
  };

  return (
    <View>
      <Text>Tus favoritos</Text>
      {/* <Button title="Buscar mis favoritos" onPress={buscarPokemones} /> */}

      {loading ? ( // Mostrar ActivityIndicator mientras se cargan los datos
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          {pokemones.map((pokemon, index) => (
            <View key={index} style={styles.contenedor}>
              <PokemonCard card={pokemon}></PokemonCard>
              <Button
                title="Eliminar de Favoritos"
                onPress={() => eliminarCardFavorito(pokemon.id)}
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
              />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
