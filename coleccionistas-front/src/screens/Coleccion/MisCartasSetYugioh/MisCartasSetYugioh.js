import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { styles } from "./MisCartasSetYugioh.styles";
import { AuthContext } from "../../../context/AuthContext";
import { ModalCarga } from "../../../components/ModalCarga";
import { ipHost } from "../../../utils";

export function MisCartasSetYugioh({ route }) {
  const [cartas, setCartas] = useState([]);
  const [misCartas, setMisCartas] = useState([]);
  const [modal, setModal] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;
  const { set } = route.params;

  useEffect(() => {
    buscarTodasCartasSet();
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
      const response = await axios.get(``);
    } catch (error) {
      console.log(error);
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
          </View>
        ))}
      </ScrollView>
    </>
  );
}
