import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

// Contexto
import { AuthContext } from "../../../context/AuthContext";
import { RecargarContext } from "../../../context/RecargarContext";

import { styles } from "./CartasSet.styles";

import { ModalCarga } from "../../../components/ModalCarga";
import { Button, Icon, Switch } from "@rneui/themed";
import { ipHost } from "../../../utils/ipHost";

export function CartasSet({ route, navigation }) {
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;
  const { mazo } = route.params;
  const [cards, setCards] = useState([]);
  const [visible, setVisible] = useState(false);
  const [reload, setReload] = useState(false);
  const [misCartas, setMisCartas] = useState([]);
  const [mostrarSoloObtenidas, setMostrarSoloObtenidas] = useState(false);
  // Modal Img
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const recargarScreen = () => {
    setReload((prevState) => !prevState);
  };

  const clickSwitch = () => {
    setMostrarSoloObtenidas((prevState) => !prevState);
  };

  useEffect(() => {
    buscarMisCartas();
  }, [reload]);

  useEffect(() => {
    buscarCartaSet();
  }, []);

  const buscarCartaSet = async () => {
    try {
      setVisible(true);
      const response = await axios.get(
        `https://api.pokemontcg.io/v2/cards/?q=id:${mazo.id}&select=id,name,images`,
        {
          headers: {
            Authorization: `Bearer d9a5dcd2-e55a-4842-a1ec-278e15879a1d`, // ACA PONGAN SU API KEY AMIGOS ,DESDPUES DEL BEARER (DESPUES ME FIJO COMO PONERLO EN BACK)
          },
        }
      );
      setCards(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setVisible(false);
    }
  };

  const buscarMisCartas = async () => {
    try {
      // console.log(mazo);
      const response = await axios.get(
        `http://${ipHost}:8080/coleccionistas/misCartasSet?mail=${mail}&idSet=${mazo.id}`
      );
      const idsMisCartas = response.data.map((carta) => carta.id_card);
      setMisCartas(idsMisCartas);
      // console.log(idsMisCartas);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const agregarCarta = async (idCard) => {
    try {
      const response = await axios.post(
        `http://${ipHost}:8080/coleccionistas/agregarCarta?mail=${mail}&idSet=${mazo.id}&idCard=${idCard}`
      );
      Alert.alert("Exito", response.data);
      recargarScreen();
    } catch (error) {
      Alert.alert("Error", error.response.data);
    }
  };

  const confimarAgregarCarta = (idCard) => {
    Alert.alert(
      "Confirmación",
      "¿Está seguro que quiere agregar esta carta a tu mazo?",
      [
        {
          text: "CANCELAR",
          onPress: () => console.log("Cancel Pressed"),
          style: "destructive",
        },
        {
          text: "ACEPTO",
          onPress: () => agregarCarta(idCard),
        },
      ],
      { cancelable: false }
    );
  };

  const eliminarCarta = async (idCard) => {
    try {
      console.log(idCard);
      const response = await axios.delete(
        `http://${ipHost}:8080/coleccionistas/eliminarCartaInventario?mail=${mail}&idSet=${mazo.id}&idCard=${idCard}`
      );
      Alert.alert("Exito", response.data);
      recargarScreen();
    } catch (error) {
      Alert.alert("Error", error.response.data);
    }
  };

  const confimarEliminarCarta = (idCard) => {
    Alert.alert(
      "Confirmación",
      "¿Está seguro que quiere eliminar esta carta de tu inventario?",
      [
        {
          text: "CANCELAR",
          onPress: () => console.log("Cancel Pressed"),
          style: "destructive",
        },
        {
          text: "ACEPTO",
          onPress: () => eliminarCarta(idCard),
        },
      ],
      { cancelable: false }
    );
  };

  const tengoCarta = (carta, cartas) => {
    // console.log(carta.id);
    console.log(cartas);
    return cartas.includes(carta.id);
  };

  return (
    <>
      <ModalCarga isVisible={visible} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.viewHeader}>
          <Text style={styles.header}>Mazo {mazo.name}</Text>
          <Text>Estas son las cartas del Mazo {mazo.name}</Text>
        </View>
        <View style={styles.view__switch}>
          <Switch value={mostrarSoloObtenidas} onValueChange={clickSwitch} />
          <Text style={styles.view__switch__texto}>Obtenidas</Text>
        </View>

        {/* Filtrado de cartas según el estado del switch */}
        {cards
          .filter((card) => {
            // Si el switch está activado, mostramos solo las cartas que tienes
            // Si está desactivado, mostramos todas las cartas
            return !mostrarSoloObtenidas || tengoCarta(card, misCartas);
          })
          .map((card, index) => (
            <View key={index} style={styles.cardContainer}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedImage(card.images.large);
                  setIsModalVisible(true);
                }}
              >
                <Image
                  style={styles.imageCard}
                  source={{ uri: `${card.images.large}` }}
                />
              </TouchableOpacity>
              {tengoCarta(card, misCartas) ? (
                <Button
                  title={"Eliminar de mi coleccion"}
                  onPress={() => confimarEliminarCarta(card.id)}
                  buttonStyle={styles.btnEliminar}
                  containerStyle={styles.btnContainer}
                  iconPosition="left"
                  icon={
                    <Icon
                      type="material-community"
                      name="book-remove-outline"
                      iconStyle={styles.iconoBtn}
                    />
                  }
                />
              ) : (
                <Button
                  title={"Agregar al inventario"}
                  onPress={() => confimarAgregarCarta(card.id)}
                  buttonStyle={styles.btnAgregar}
                  containerStyle={styles.btnContainer}
                  iconPosition="left"
                  icon={
                    <Icon
                      type="material-community"
                      name="book-plus-outline"
                      iconStyle={styles.iconoBtn}
                    />
                  }
                />
              )}

              {tengoCarta(card, misCartas) ? (
                <Icon
                  type="material-community"
                  name="trophy"
                  color={"#FFD700"}
                  raised
                  containerStyle={styles.iconoTrophy}
                />
              ) : null}
            </View>
          ))}
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
      </ScrollView>
    </>
  );
}
