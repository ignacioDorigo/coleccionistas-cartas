import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import axios from "axios";
import { ModalCarga } from "../../../components/ModalCarga";

import { ipHost } from "../../../utils";

// Contexto
import { AuthContext } from "../../../context/AuthContext";
import { RecargarContext } from "../../../context/RecargarContext";

// Fichero Screen
import { screen } from "../../../utils";

import { styles } from "./ElegirSetPokemon.styles";

export function ElegirSetPokemon({ route, navigation }) {
  //   Context para identificar al usuario con su mail
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;

  //   Para recargar las paginas
  const { recargarColecciones } = useContext(RecargarContext);

  //   Cosas que vienen desde otra Screen
  const { coleccion } = route.params;
  const [mazosDisponibles, setMazosDisponibles] = useState([]);

  // Visiblidad del modal
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    buscarSetsDisponibles();
  }, []);

  const buscarSetsDisponibles = async () => {
    try {
      setVisible(true);
      const response = await axios.get(`https://api.pokemontcg.io/v2/sets`);
      setMazosDisponibles(response.data.data);
      for (let index = 0; index < response.data.data.length; index++) {
        const element = response.data.data[index];
      }
    } catch (error) {
      console.log(error);
    } finally {
      setVisible(false);
    }
  };

  const handleMazoPress = (mazo) => {
    Alert.alert(
      "Confirmación",
      "¿Está seguro que quiere crear una colección de este mazo?",
      [
        {
          text: "CANCELAR",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "ACEPTO",
          onPress: () => {
            axios
              .post(
                `http://${ipHost}:8080/coleccionistas/crearColeccion?mail=${mail}&idMazo=${mazo.id}&idColeccion=${coleccion.id}`
              )
              .then((response) => {
                recargarColecciones();
                navigation.navigate(screen.coleccion.cartasSet, {
                  coleccion,
                  mazo,
                });
              })
              .catch((error) => Alert.alert("Error", `${error.response.data}`));
          },
        },
      ],
      { cancelable: false }
    );
    console.log("mazo: ", mazo);
  };

  return (
    <>
      <ModalCarga isVisible={visible} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.viewHeader}>
          <Text style={styles.header}>Sets Disponibles</Text>
        </View>
        {mazosDisponibles.map((mazo, index) => (
          <TouchableOpacity
            key={index}
            style={styles.touchable}
            onPress={() => handleMazoPress(mazo)}
          >
            <Image style={styles.image} source={{ uri: mazo.images.logo }} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}
