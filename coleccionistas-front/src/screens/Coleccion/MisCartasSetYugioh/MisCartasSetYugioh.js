import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { styles } from "./MisCartasSetYugioh.styles";
import { AuthContext } from "../../../context/AuthContext";
import { ModalCarga } from "../../../components/ModalCarga";
import { ipHost } from "../../../utils";

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

  useEffect(() => {
    buscarTodasCartasSet();
    buscarMisCartasSet();
  }, []);

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
        `http://localhost:8080/coleccionistas/yugioh/misCartas?mail=${mail}&idSet=${set.set_name}`
      );
      setMisCartas(response.data);
    } catch (error) {
      console.log(error);
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
                tengoCarta ? styles.cardGreen : styles.cardRed, // Aplica estilos condicionales
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

              <Text style={tengoCarta ? styles.textGreen : styles.textRed}>
                {tengoCarta ? "Tengo esta carta" : "No tengo esta carta"}
              </Text>
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
