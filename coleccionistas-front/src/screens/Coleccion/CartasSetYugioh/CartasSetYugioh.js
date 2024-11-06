import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, Image, Alert } from "react-native";
import { ModalCarga } from "../../../components/ModalCarga";
import { styles } from "./CartasSetYugioh.styles";
import { Button, Icon } from "@rneui/themed";
import { ipHost } from "../../../utils/ipHost";
import { AuthContext } from "../../../context/AuthContext";

export function CartasSetYugioh({ route }) {
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;

  const [modal, setModal] = useState(false);
  const { coleccion, setName } = route.params;
  // console.log("CARTAS SET YUGIOH SCREEN : SET NAME --> " + setName);
  const [cartas, setCartas] = useState([]);

  useEffect(() => {
    buscarCartas();
  }, []);

  const mostrarOcultarModal = () => {
    setModal((prevState) => !prevState);
  };

  function construirURL(cardSetName) {
    const baseUrl = "https://db.ygoprodeck.com/api/v7/cardinfo.php?cardset=";
    const encodedCardSetName = encodeURIComponent(cardSetName.trim());
    return `${baseUrl}${encodedCardSetName}`;
  }

  const buscarCartas = async () => {
    try {
      const url = construirURL(setName);
      mostrarOcultarModal();
      const response = await axios.get(url);
      setCartas(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      mostrarOcultarModal();
    }
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
      Alert.alert("Exito", response.data);
    } catch (error) {
      Alert.alert("Error", error.response.data);
    }
  };
  return (
    <>
      <ModalCarga isVisible={modal} />
      <ScrollView contentContainerStyle={styles.container}>
        {cartas.map((carta, index) => (
          <View key={index} style={styles.cardContainer}>
            <Image
              source={{ uri: carta.card_images?.[0]?.image_url }}
              style={styles.imageCard}
            />
            {mostrarPropiedad("ID", carta.id)}
            {mostrarPropiedad("Nombre", carta.name)}
            {mostrarPropiedad("Descripción", carta.desc)}
            {mostrarPropiedad("Tipo", carta.type)}
            {mostrarPropiedad("Atributo", carta.attribute)}
            {mostrarPropiedad("Ataque", carta.atk)}
            {mostrarPropiedad("Defensa", carta.def)}
            <Button
              iconPosition="left"
              icon={
                <Icon
                  type="material-community"
                  name="account"
                  color={"#FFFFFF"}
                ></Icon>
              }
              containerStyle={styles.btnContainer}
              buttonStyle={styles.btn}
              title={"   Agregar al inventario"}
              onPress={() => agregarCartaAColeccion(carta.name)}
            />
          </View>
        ))}
      </ScrollView>
    </>
  );
}
