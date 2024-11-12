import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import { styles } from "./MisCartasSetYugioh.styles";
import { AuthContext } from "../../../context/AuthContext";
import { ModalCarga } from "../../../components/ModalCarga";
import { ipHost } from "../../../utils";
import { Button, Icon } from "@rneui/themed";

export function MisCartasSetYugioh({ route }) {
  // Todas las cartas del SET (incluidas las que no tenemos)
  const [cartas, setCartas] = useState([]);

  //Cartas que tenemos
  const [misCartas, setMisCartas] = useState([]);

  //Modal de carga
  const [modal, setModal] = useState(false);

  // Modal para imagen ampliada
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Contexto para exxtraer mail
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;

  // Set elegido por el usuario
  const { set } = route.params;

  const [recargar, setRecargar] = useState(false);

  const recargarScreen = () => {
    setRecargar((prevState) => !prevState);
  };

  useEffect(() => {
    buscarTodasCartasSet();
    buscarMisCartasSet();
  }, [recargar]);

  function construirURL(cardSetName) {
    const baseUrl = "https://db.ygoprodeck.com/api/v7/cardinfo.php?cardset=";
    const encodedCardSetName = encodeURIComponent(cardSetName.trim());
    return `${baseUrl}${encodedCardSetName}`;
  }

  const mostrarPropiedad = (label, valor) =>
    valor ? (
      <View style={styles.textContainer}>
        <Text style={styles.textLabel}>{label}:</Text>
        <Text style={styles.textValue}>{valor}</Text>
      </View>
    ) : null;

  const buscarTodasCartasSet = async () => {
    try {
      setModal(true);
      const url = construirURL(set.set_name);
      const response = await axios.get(url);
      setCartas(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setModal(false);
    }
  };

  const buscarMisCartasSet = async () => {
    try {
      const response = await axios.get(
        `http://${ipHost}:8080/coleccionistas/yugioh/misCartas?mail=${mail}&idSet=${set.set_name}`
      );
      setMisCartas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarCarta = async (card_name) => {
    try {
      const response = await axios.delete(
        `http://${ipHost}:8080/coleccionistas/yugioh/eliminarCartaInventario?mail=${mail}&setName=${set.set_name}&cardName=${card_name}`
      );
      Alert.alert("Exito", response.data);
      recargarScreen();
    } catch (error) {
      Alert.alert("Error", error.response.data);
    }
  };

  const agregarCarta = async (card_name) => {
    try {
      const response = await axios.post(
        `http://${ipHost}:8080/coleccionistas/yugioh/agregarCarta?mail=${mail}&setName=${set.set_name}&cardName=${card_name}`
      );
      Alert.alert("Exito", response.data);
      recargarScreen();
    } catch (error) {
      Alert.alert("Error", error.response.data);
    }
  };

  // Función para verificar si la carta está en la colección del usuario usando el nombre
  const esCartaMia = (cartaName) => {
    return misCartas.some((carta) => carta.id_card === cartaName);
  };

  return (
    <>
      <ModalCarga isVisible={modal} />

      <ScrollView contentContainerStyle={styles.container}>
        {cartas.map((carta, index) => {
          const tengoCarta = esCartaMia(carta.name);
          return (
            <View
              key={index}
              style={[
                styles.cardContainer,
                tengoCarta ? styles.cardGreen : styles.cardRed,
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  setSelectedImage(carta.card_images?.[0]?.image_url);
                  setIsModalVisible(true);
                }}
              >
                <Image
                  source={{ uri: carta.card_images?.[0]?.image_url }}
                  style={styles.imageCard}
                />
              </TouchableOpacity>

              {tengoCarta ? (
                <Button
                  title={"Eliminar del inventario"}
                  onPress={() => eliminarCarta(carta.name)}
                  buttonStyle={styles.btnEliminar}
                  containerStyle={styles.btnContainer}
                />
              ) : (
                <Button
                  title={"Agregar al inventario"}
                  onPress={() => agregarCarta(carta.name)}
                  buttonStyle={styles.btnAgregar}
                  containerStyle={styles.btnContainer}
                />
              )}

              <Text style={tengoCarta ? styles.textGreen : styles.textRed}>
                {tengoCarta ? "Tengo esta carta" : "No tengo esta carta"}
              </Text>

              {/* Para poner el iconito del trofeo en caso de que la tengamos*/}
              {tengoCarta ? (
                <Icon
                  type="material-community"
                  name="trophy"
                  color={"#FFD700"}
                  raised
                  containerStyle={styles.iconoTrophy}
                />
              ) : (
                <></>
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* Modal para mostrar la imagen ampliada */}
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
    </>
  );
}
