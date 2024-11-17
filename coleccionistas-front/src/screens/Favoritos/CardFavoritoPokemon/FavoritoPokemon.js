import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Image, Alert, Modal } from "react-native";
import { styles } from "./FavoritoPokemon.styles";
import { Icon } from "@rneui/themed";
import { TouchableOpacity } from "react-native";
import { ipHost } from "../../../utils/ipHost";

export function FavoritoPokemon(props) {
  const { idPokemon, index, misFavoritosIdsPokemon, recargarFavoritos, mail } =
    props;
  // Modal Img
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    buscarObjetoPokemon();
  }, []);

  const buscarObjetoPokemon = async () => {
    try {
      const response = await axios.get(
        `https://api.pokemontcg.io/v2/cards?q=id:${idPokemon}&select=id,name,images`
      );
      const objeto = response.data.data[0];
      setPokemon(objeto);
      //   console.log(objeto);
    } catch (error) {}
  };

  const confirmarAgregarAfavoritos = async (idCard) => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de que queres agregar esta carta a tus favoritos?",
      [
        {
          text: "Cancelar",
          style: "destructive",
        },
        {
          text: "Agregar",
          style: "default",
          onPress: () => agregarCardFavoritos(idCard),
        },
      ],
      { cancelable: true }
    );
  };

  const agregarCardFavoritos = async (idCard) => {
    try {
      const response = await axios.post(
        `http://${ipHost}:8080/coleccionistas/agregarFavoritoPokemon?idCard=${idCard}&mail=${mail}`
      );
      Alert.alert("Exito", response.data);
      recargarFavoritos();
    } catch (error) {
      Alert.alert("Error", error.response.data);
    } finally {
    }
  };

  const estaEnFavoritos = (cardId, favoritos) => {
    // console.log(favoritos.includes(cardId));
    return favoritos.includes(cardId);
  };

  const confirmarEliminarAfavoritos = async (idCard) => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de que queres eliminar esta carta de tus favoritos?",
      [
        {
          text: "Cancelar",
          style: "destructive",
        },
        {
          text: "Eliminar",
          style: "default",
          onPress: () => eliminarCardFavoritos(idCard),
        },
      ],
      { cancelable: true }
    );
  };

  const eliminarCardFavoritos = async (idCard) => {
    try {
      const response = await axios.delete(
        `http://${ipHost}:8080/coleccionistas/eliminarFavoritoPokemon?idCard=${idCard}&mail=${mail}`
      );
      Alert.alert("Exito", response.data);
      recargarFavoritos();
    } catch (error) {
      Alert.alert("Error", error.response.data);
    } finally {
    }
  };

  return (
    <View key={index} style={styles.cardContainer}>
      <TouchableOpacity
        onPress={() => {
          setSelectedImage(pokemon?.images?.small);
          setIsModalVisible(true);
        }}
      >
        <Image
          style={styles.cardImage}
          source={{ uri: pokemon?.images.small }}
        />
      </TouchableOpacity>

      {estaEnFavoritos(pokemon?.id, misFavoritosIdsPokemon) ? (
        <Icon
          containerStyle={styles.iconoFavoritos}
          iconStyle={styles.iconoCorazonAgregado}
          raised
          name="heart"
          type="material-community"
          color="#FFFFFF"
          onPress={() => confirmarEliminarAfavoritos(pokemon?.id)}
        />
      ) : (
        <Icon
          containerStyle={styles.iconoFavoritos}
          iconStyle={styles.iconoCorazonFaltante}
          raised
          reverse
          name="heart-outline"
          type="material-community"
          color="#FFFFFF"
          onPress={() => confirmarAgregarAfavoritos(pokemon?.id)}
        />
      )}
      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.overlayContainer}>
          <TouchableOpacity
            style={styles.overlayBackground}
            onPress={() => setIsModalVisible(false)}
          />
          <View style={styles.modalImageContainer}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.modalImage}
              resizeMode="contain"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
