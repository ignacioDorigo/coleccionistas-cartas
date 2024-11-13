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
  ScrollView,
} from "react-native";
import { styles } from "./MisCartasSetYugioh.styles";
import { AuthContext } from "../../../context/AuthContext";
import { ModalCarga } from "../../../components/ModalCarga";
import { ipHost } from "../../../utils";
import { Button, Icon } from "@rneui/themed";

export function MisCartasSetYugioh({ route }) {
  // Modal carga
  const [modal, setModal] = useState(false);
  // Modal Img
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;
  const { setName } = route.params;
  const [reload, setReload] = useState(false);

  const [namesMisCartas, setNamesMisCartas] = useState([]);
  const [todasCartas, setTodasCartas] = useState([]);

  const recargarScreen = () => {
    setReload((prevState) => !prevState);
  };

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

  useEffect(() => {
    buscarNameMisCartas();
    todasCartasSet();
  }, [reload]);

  return (
    <>
    {todasCartas.length===0?      <ModalCarga isVisible={true} />:<>
      <ScrollView contentContainerStyle={styles.container}>
        {todasCartas.map((carta, index) => (
          <View style={styles.cardContainer} key={index}>
            <TouchableOpacity
              onPress={() => {
                setSelectedImage(carta.img);
                setIsModalVisible(true);
              }}
            >
              <Image source={{ uri: carta.img }} style={styles.imageCard} />
            </TouchableOpacity>
            {tengoCarta(carta.name, namesMisCartas) ? (
              <Button title={"ELIMINAR DEL INVENTARIO"}/>
            ) : (
              <Text>NO LA TENGO</Text>
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
      </Modal></>}


    </>
  );
}
