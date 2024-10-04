import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView, ActivityIndicator, Alert } from "react-native";
import { Button, Icon } from "@rneui/themed";
import { AuthContext } from "../../../context/AuthContext";
import PokemonCard from "../../../components/PokemonCard";
import axios from "axios";
import styles from "./FavoritosScreen.styles";
  

export function FavoritosScreen() {
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;
  const [ids, setIds] = useState([]);
  const [pokemones, setPokemones] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    buscarIds();
  }, []);

  const buscarIds = async () => {
    const response = await axios.get(
      `http://192.168.1.5:8080/coleccionistas/misFavoritosPokemon?mail=${mail}`
    );
    setIds(response.data);
  };

  const buscarPokemones = async () => {
    setLoading(true); // Iniciar el indicador de carga
    const objetos = [];
    for (let index = 0; index < ids.length; index++) {
      const element = ids[index];
      const { id_card } = element;
      const respuesta = await axios.get(
        `https://api.pokemontcg.io/v2/cards?q=id:${id_card}`
      );
      const objeto = respuesta.data.data[0];
      objetos.push(objeto);
    }
    setPokemones(objetos);
    setLoading(false); // Detener el indicador de carga una vez que los datos han sido cargados
  };

  const eliminarCardFavorito = (id) => {
    setLoading(true);
    axios
      .delete(
        `http://localhost:8080/coleccionistas/eliminarFavoritoPokemon?idCard=${id}&mail=${mail}`
      )
      .then((response) => {
        Alert.alert("Exito", response.data);
        setIds([]);
        setPokemones([]);
        console.log(ids);
        // buscarIds();
        // buscarPokemones();
      })
      .catch((error) => {
        Alert.alert("Error", error.response.data);
      });
    setLoading(false);
  };

  return (
    <View>
      <Text>Tus favoritos</Text>
      <Button title="Buscar mis favoritos" onPress={buscarPokemones} />

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
