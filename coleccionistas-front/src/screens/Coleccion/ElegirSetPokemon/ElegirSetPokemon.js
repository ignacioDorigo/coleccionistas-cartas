import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import axios from "axios";

// Contexto
import { AuthContext } from "../../../context/AuthContext";
import { RecargarContext } from "../../../context/RecargarContext";

// Fichero Screen
import { screen } from "../../../utils";

export function ElegirSetPokemon({ route, navigation }) {
  //   Context para identificar al usuario con su mail
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;

  //   Para recargar las paginas
  const { recargarColecciones } = useContext(RecargarContext);

  //   Cosas que vienen desde otra Screen
  const { coleccion } = route.params;
  const [mazosDisponibles, setMazosDisponibles] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.pokemontcg.io/v2/sets/`)
      .then((response) => setMazosDisponibles(response.data.data))
      .catch((error) => console.log(error));
  });

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
                `http://192.168.1.14:8080/coleccionistas/crearColeccion?mail=${mail}&idMazo=${mazo.id}&idColeccion=${coleccion.id}`
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
    <ScrollView style={styles.container}>
      <Text>Elegi que Set de Pokemon queres coleccionar</Text>
      {mazosDisponibles.map((mazo, index) => (
        <TouchableOpacity
          key={index}
          style={styles.mazo}
          onPress={() => handleMazoPress(mazo)}
        >
          <Image
            style={styles.images}
            source={{ uri: mazo.images.logo }}
          ></Image>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  mazo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "lightgray",
    marginTop: 10,
    marginBottom: 10,
  },
  mazo__texto: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },
  images: {
    width: "100%",
    height: 50,
    resizeMode: "contain",
  },
});
