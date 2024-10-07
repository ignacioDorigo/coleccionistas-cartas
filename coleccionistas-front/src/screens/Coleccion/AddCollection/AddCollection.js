import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import axios from "axios";

import { styles } from "./AddCollection.styles";
// Fichero Screen
import { screen } from "../../../utils";

export function AddCollection({ navigation }) {
  const [colecciones, setColecciones] = useState([]);

  const ViajarColeccion = (coleccion) => {
    if (coleccion.nombre === "Pokemon") {
      navigation.navigate(screen.coleccion.elegirSetPokemon, {
        coleccion: coleccion,
      });
    }
    if (coleccion.nombre === "Yugioh") {
        Alert.alert("Aviso","La colección de YuGiOh estara disponible en el proximo sprint");
    }
  };

  useEffect(() => {
    axios
      .get(`http://192.168.1.14:8080/coleccionistas/coleccionesDisponibles`)
      .then((respuestaBack) => {
        setColecciones(respuestaBack.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.viewHeader}>
        <Text style={styles.header}>Colecciones Disponibles</Text>
        <Text style={styles.subtitle}>Elegí el tema sobre el cual queres empezar a coleccionar</Text>
      </View>

      {colecciones.map((coleccion, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => ViajarColeccion(coleccion)}
          style={styles.touchable}
        >
          <Image
            style={styles.image}
            source={{ uri: `${coleccion.imagen}` }}
          ></Image>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
