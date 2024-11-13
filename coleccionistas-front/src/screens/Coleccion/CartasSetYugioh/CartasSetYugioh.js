import axios from "axios";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { View, Text, Modal, Image, Alert, FlatList } from "react-native";
import { ModalCarga } from "../../../components/ModalCarga";
import { styles } from "./CartasSetYugioh.styles";
import { Button, Icon } from "@rneui/themed";
import { ipHost } from "../../../utils/ipHost";
import { AuthContext } from "../../../context/AuthContext";
import { TouchableOpacity } from "react-native";

export function CartasSetYugioh({ route }) {
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;

  const [modal, setModal] = useState(false);
  const { coleccion, setName } = route.params;

  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cartas, setCartas] = useState([]);

  // Función optimizada para evitar la recarga innecesaria de cartas
  const buscarCartas = useCallback(async () => {
    if (cartas.length > 0) return; // Evitar llamada si ya se cargaron las cartas

    try {
      const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?cardset=${encodeURIComponent(
        setName.trim()
      )}`;
      mostrarOcultarModal();
      const response = await axios.get(url);
      setCartas(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      mostrarOcultarModal();
    }
  }, [cartas, setName]);

  useEffect(() => {
    buscarCartas();
  }, [buscarCartas]);

  const mostrarOcultarModal = () => {
    setModal((prevState) => !prevState);
  };

  const mostrarPropiedad = (label, valor) =>
    valor ? (
      <View style={styles.textContainer}>
        <Text style={styles.textLabel}>{label}:</Text>
        <Text style={styles.textValue}>{valor}</Text>
      </View>
    ) : null;

  const agregarCartaAColeccion = async (cardName) => {
    try {
      const response = await axios.post(
        `http://${ipHost}:8080/coleccionistas/yugioh/agregarCarta?mail=${mail}&setName=${setName}&cardName=${cardName}`
      );
      Alert.alert("Éxito", response.data);
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data || "Hubo un problema al agregar la carta."
      );
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
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
      {mostrarPropiedad("ID", item.id)}
      {mostrarPropiedad("Nombre", item.name)}
      {mostrarPropiedad("Descripción", item.desc)}
      {mostrarPropiedad("Tipo", item.type)}
      {mostrarPropiedad("Atributo", item.attribute)}
      {mostrarPropiedad("Ataque", item.atk)}
      {mostrarPropiedad("Defensa", item.def)}
      <Button
        iconPosition="left"
        icon={
          <Icon type="material-community" name="account" color={"#FFFFFF"} />
        }
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        title="   Agregar al inventario"
        onPress={() => agregarCartaAColeccion(item.name)}
      />
    </View>
  );

  return (
    <>
      <ModalCarga isVisible={modal} />
      <FlatList
        data={cartas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
      />
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
