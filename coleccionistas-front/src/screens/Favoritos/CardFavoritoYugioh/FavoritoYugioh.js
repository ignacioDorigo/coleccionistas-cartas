import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { ipHost } from "../../../utils/ipHost";
import axios from "axios";
import { styles } from "./FavoritoYugioh.styles";
import { Icon } from "@rneui/themed";

export function FavoritoYugioh(props) {
  const { idYugioh, index, misFavoritosIdsYugioh, recargarFavoritos, mail } =
    props;
  const [yugioh, setYugioh] = useState(null);

  useEffect(() => {
    buscarObjeto();
  }, []);

  const buscarObjeto = async () => {
    const response = await axios.get(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${idYugioh}`
    );
    const objeto = response.data.data[0];
    setYugioh(objeto);
    // console.log(objeto);
    // console.log(objeto.card_images[0].image_url);
    try {
    } catch (error) {
      console.log(error);
    }
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
      // setVisible(true);
      console.log(idCard);
      const response = await axios.delete(
        `http://${ipHost}:8080/coleccionistas/eliminarFavoritoYugioh?idCard=${idCard}&mail=${mail}`
      );
      Alert.alert("Exito", response.data);
      recargarFavoritos();
    } catch (error) {
      Alert.alert("Error", error.response.data);
    } finally {
      // setVisible(false);
    }
  };

  return (
    <View key={index} style={styles.cardContainer}>
      <TouchableOpacity
        onPress={() => {
          //   setSelectedImage(card.images.small);
          //   setIsModalVisible(true);
        }}
      >
        <Image
          style={styles.cardImage}
          source={{ uri: yugioh?.card_images[0]?.image_url }}
        />
      </TouchableOpacity>

      <Icon
        containerStyle={styles.iconoFavoritos}
        iconStyle={styles.iconoCorazonAgregado}
        raised
        name="heart"
        type="material-community"
        color="#FFFFFF"
        onPress={() => confirmarEliminarAfavoritos(yugioh?.name)}
      />
    </View>
  );
}
