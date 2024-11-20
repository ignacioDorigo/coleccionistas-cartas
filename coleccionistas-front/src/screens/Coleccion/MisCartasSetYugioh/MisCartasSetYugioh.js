import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Image,
  Modal,
  TouchableOpacity,
  Alert,
  Text,
  ScrollView,
} from "react-native";
import { styles } from "./MisCartasSetYugioh.styles";
import { AuthContext } from "../../../context/AuthContext";
import { ModalCarga } from "../../../components/ModalCarga";
import { ipHost } from "../../../utils";
import { Button, Icon, Switch } from "@rneui/themed";
import { RecargarContext } from "../../../context/RecargarContext";

export function MisCartasSetYugioh({ route }) {
  // De alguna manera tengo que recargar el screen de favoritos, entonces cree un context de eso
  const { recargarFavoritos } = useContext(RecargarContext);
  // Modal Img
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;
  const { setName } = route.params;
  const [reload, setReload] = useState(false);

  const [namesMisCartas, setNamesMisCartas] = useState([]);
  const [todasCartas, setTodasCartas] = useState([]);
  const [mostrarSoloObtenidas, setMostrarSoloObtenidas] = useState(false);
  const [misFavoritosIds, setMisFavoritosIds] = useState([]);

  const clickSwitch = () => {
    setMostrarSoloObtenidas((prevState) => !prevState);
  };

  const recargarScreen = () => {
    setReload((prevState) => !prevState);
  };

  useEffect(() => {
    buscarNameMisCartas();
    buscarMisFavoritos();
  }, [reload]);

  useEffect(() => {
    todasCartasSet();
  }, []);

  const buscarNameMisCartas = async () => {
    try {
      const response = await axios.get(
        `http://${ipHost}:8080/coleccionistas/yugioh/misCartas?mail=${mail}&idSet=${setName}`
      );
      const objetos = response.data;
      const names = objetos.map((objeto) => objeto.id_card);
      // console.log(names);
      setNamesMisCartas(names);
    } catch (error) {
      console.log("Error en el fetch de buscar mis cartas");
      console.log(error);
    }
  };

  const todasCartasSet = async () => {
    try {
      const url = construirURL(setName);
      const response = await axios.get(url);
      const cartas = response.data.data;
      // Solo me vpy a quedar con el nombre de la carta y la img
      const objetos = cartas.map((carta) => ({
        name: carta.name,
        img: carta?.card_images[0]?.image_url,
      }));
      setTodasCartas(objetos);
      // console.log(objetos);
    } catch (error) {
      console.log("Error en el fetch de buscar TODAS LAS CARTAS DE UN SET");
      console.log(error);
    }
  };

  const construirURL = (cardSetName) => {
    const baseUrl = "https://db.ygoprodeck.com/api/v7/cardinfo.php?cardset=";
    const encodedCardSetName = encodeURIComponent(cardSetName.trim());
    const url = `${baseUrl}${encodedCardSetName}`;
    // console.log("URL: " + url);
    return url;
  };

  function tengoCarta(cardName, names) {
    // console.log(names.includes(cardName));
    return names.includes(cardName);
  }

  const confirmarAgregarCarta = (cardName) => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de que deseas agregar esta carta a tu inventario?",
      [
        {
          text: "Cancelar",
          style: "destructive",
        },
        {
          text: "Agregar",
          style: "default",
          onPress: () => agregarCarta(cardName),
        },
      ],
      { cancelable: true }
    );
  };

  const agregarCarta = async (cardName) => {
    try {
      const response = await axios.post(
        `http://${ipHost}:8080/coleccionistas/yugioh/agregarCarta?mail=${mail}&setName=${setName}&cardName=${cardName}`
      );
      Alert.alert("Exito", response.data);
      recargarScreen();
    } catch (error) {
      Alert.alert("Error", error.response.data);
    }
  };

  const confirmarEliminarCarta = (cardName) => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de que deseas eliminar esta carta de tu inventario?",
      [
        {
          text: "Cancelar",
          style: "destructive",
        },
        {
          text: "Eliminar",
          style: "default",
          onPress: () => eliminarCarta(cardName),
        },
      ],
      { cancelable: true }
    );
  };

  const eliminarCarta = async (cardName) => {
    try {
      const response = await axios.delete(
        `http://${ipHost}:8080/coleccionistas/yugioh/eliminarCartaInventario?mail=${mail}&setName=${setName}&cardName=${cardName}`
      );
      Alert.alert("Exito", response.data);
      recargarScreen();
    } catch (error) {
      Alert.alert("Error", error.response.data);
    }
  };

  // ------------------ TODO LO DE FAVORITOS ------------------

  const buscarMisFavoritos = async () => {
    try {
      const response = await axios.get(
        `http://${ipHost}:8080/coleccionistas/misFavoritosYugioh?mail=${mail}`
      );
      const misFavoritos = response.data;
      const misFavoritosIdsss = misFavoritos.map(
        (favorito) => favorito.id_card
      );
      setMisFavoritosIds(misFavoritosIdsss);
      console.log("Mis favoritos");
      console.log(misFavoritosIdsss);
    } catch (error) {
      console.log(error.response.data);
    }
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
      // setVisible(true);
      const response = await axios.post(
        `http://${ipHost}:8080/coleccionistas/agregarFavoritoYugioh?idCard=${idCard}&mail=${mail}`
      );
      Alert.alert("Exito", response.data);
      recargarScreen();
      recargarFavoritos();
    } catch (error) {
      Alert.alert("Error", error.response.data);
    } finally {
      // setVisible(false);
    }
  };

  const estaEnFavoritos = (cardId, favoritos) => {
    // console.log(cardId);
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
      // setVisible(true);
      const response = await axios.delete(
        `http://${ipHost}:8080/coleccionistas/eliminarFavoritoYugioh?idCard=${idCard}&mail=${mail}`
      );
      Alert.alert("Exito", response.data);
      recargarScreen();
      recargarFavoritos();
    } catch (error) {
      Alert.alert("Error", error.response.data);
    } finally {
      // setVisible(false);
    }
  };

  // -----------------------------------------------------------

  return (
    <>
      {todasCartas.length === 0 ? (
        <ModalCarga isVisible={true} />
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.view__switch}>
              <Switch
                value={mostrarSoloObtenidas}
                onValueChange={(value) => setMostrarSoloObtenidas(value)}
              />
              <Text style={styles.view__switch__texto}>Obtenidas</Text>
            </View>

            {todasCartas
              .filter((carta) =>
                mostrarSoloObtenidas
                  ? tengoCarta(carta.name, namesMisCartas)
                  : true
              )
              .map((carta, index) => (
                <View style={styles.cardContainer} key={index}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedImage(carta.img);
                      setIsModalVisible(true);
                    }}
                  >
                    <Image
                      source={{ uri: carta.img }}
                      style={styles.imageCard}
                    />
                  </TouchableOpacity>
                  {tengoCarta(carta.name, namesMisCartas) ? (
                    <Button
                      title={"Eliminar de mi coleccion"}
                      buttonStyle={styles.btnEliminar}
                      onPress={() => confirmarEliminarCarta(carta.name)}
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
                      title={"Agregar a mi coleccion"}
                      onPress={() => confirmarAgregarCarta(carta.name)}
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

                  {tengoCarta(carta.name, namesMisCartas) ? (
                    <Icon
                      type="material-community"
                      name="trophy"
                      color={"#FFD700"}
                      raised
                      containerStyle={styles.iconoTrophy}
                    />
                  ) : null}

                  {estaEnFavoritos(carta.name, misFavoritosIds) ? (
                    <Icon
                      containerStyle={styles.iconoFavoritos}
                      iconStyle={styles.iconoCorazonAgregado}
                      raised
                      name="heart"
                      type="material-community"
                      color="#FFFFFF"
                      onPress={() => confirmarEliminarAfavoritos(carta.name)}
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
                      onPress={() => confirmarAgregarAfavoritos(carta.name)}
                    />
                  )}
                </View>
              ))}
          </ScrollView>

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
      )}
    </>
  );
}
