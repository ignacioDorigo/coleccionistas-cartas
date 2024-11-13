import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
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
  const [cartas, setCartas] = useState([]);
  const [misCartas, setMisCartas] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isEndOfList, setIsEndOfList] = useState(false);

  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;
  const { set } = route.params;

  useEffect(() => {
    buscarTodasCartasSet();
    buscarMisCartasSet();
  }, []);

  const construirURL = (cardSetName) => {
    const baseUrl = "https://db.ygoprodeck.com/api/v7/cardinfo.php?cardset=";
    const encodedCardSetName = encodeURIComponent(cardSetName.trim());
    return `${baseUrl}${encodedCardSetName}&page=${page}&limit=20`; // Paginación
  };

  const buscarTodasCartasSet = async () => {
    if (loading || isEndOfList) return; // Evitar peticiones duplicadas
    setLoading(true);
    try {
      const url = construirURL(set.set_name);
      const response = await axios.get(url);
      console.log(response.data.data);

      if (response.data.data.length < 20) {
        setIsEndOfList(true); // Finalizó la carga
      }
      setCartas((prevState) => [...prevState, ...response.data.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
      Alert.alert("Éxito", response.data);
      buscarMisCartasSet(); // Recargar las cartas del usuario
    } catch (error) {
      Alert.alert("Error", error.response?.data || error.message);
    }
  };

  const agregarCarta = async (card_name) => {
    try {
      const response = await axios.post(
        `http://${ipHost}:8080/coleccionistas/yugioh/agregarCarta?mail=${mail}&setName=${set.set_name}&cardName=${card_name}`
      );
      Alert.alert("Éxito", response.data);
      buscarMisCartasSet(); // Recargar las cartas del usuario
    } catch (error) {
      Alert.alert("Error", error.response?.data || error.message);
    }
  };

  const esCartaMia = (cartaName) => {
    return misCartas.some((carta) => carta.id_card === cartaName);
  };

  const renderItem = ({ item }) => {
    const tengoCarta = esCartaMia(item.name);
    return (
      <View
        style={[
          styles.cardContainer,
          tengoCarta ? styles.cardGreen : styles.cardRed,
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            setSelectedImage(item.card_images?.[0]?.image_url);
            setIsModalVisible(true);
          }}
        >
          <Image
            source={{ uri: item.card_images?.[0]?.image_url }}
            style={styles.imageCard}
          />
        </TouchableOpacity>

        {tengoCarta ? (
          <Button
            title={"Eliminar del inventario"}
            onPress={() => eliminarCarta(item.name)}
            buttonStyle={styles.btnEliminar}
            containerStyle={styles.btnContainer}
          />
        ) : (
          <Button
            title={"Agregar al inventario"}
            onPress={() => agregarCarta(item.name)}
            buttonStyle={styles.btnAgregar}
            containerStyle={styles.btnContainer}
          />
        )}

        <Text style={tengoCarta ? styles.textGreen : styles.textRed}>
          {tengoCarta ? "Tengo esta carta" : "No tengo esta carta"}
        </Text>

        {tengoCarta && (
          <Icon
            type="material-community"
            name="trophy"
            color={"#FFD700"}
            raised
            containerStyle={styles.iconoTrophy}
          />
        )}
      </View>
    );
  };

  const loadMore = () => {
    if (!isEndOfList) {
      setPage((prevPage) => prevPage + 1); // Incrementar página para cargar más
      buscarTodasCartasSet();
    }
  };

  return (
    <>
      <ModalCarga isVisible={modal} />

      <FlatList
        data={cartas}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={loadMore} // Cargar más al final
        onEndReachedThreshold={0.5} // 50% de la lista
        ListFooterComponent={
          loading && !isEndOfList ? <Text>Cargando...</Text> : null
        }
      />

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
