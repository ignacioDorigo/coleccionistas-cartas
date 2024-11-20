import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useTheme } from "context/ThemeContext";
import { lightTheme, darkTheme } from "constants/themes";
import createStyles from "./ColeccionScreen.styles";
import { Icon } from "@rneui/themed";
import axios from "axios";

// Fichero Screen
import { screen } from "../../../utils";

import { ipHost } from "../../../utils";

// Contexto
import { AuthContext } from "../../../context/AuthContext";
import { RecargarContext } from "../../../context/RecargarContext";

export function ColeccionScreen({ navigation }) {
  // El context isLoggedIn me guarda el mail
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;

  // context para recargar la screen
  const { colecciones } = useContext(RecargarContext);

  // Estilos
  const { isDarkTheme } = useTheme();
  const theme = isDarkTheme ? darkTheme : lightTheme;
  const styles = createStyles(theme);

  const [misColecciones, setMisColecciones] = useState([]);

  useEffect(() => {
    axios
      .get(`http://${ipHost}:8080/coleccionistas/misColecciones?mail=${mail}`)
      .then((respuestaBack) => setMisColecciones(respuestaBack.data))
      .catch((error) => console.log(error));
  }, [colecciones]);

  const irAScreenColeccion = (nombre) => {
    let nombreScreen;
    if (nombre === "Pokemon") {
      nombreScreen = screen.coleccion.misSetsPokemon;
    }
    if (nombre === "Yugioh") {
      nombreScreen = screen.coleccion.misSetsYugioh;
    }
    navigation.navigate(nombreScreen);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={(styles.header)}>
          <Text style={styles.header__text}>Mis Colecciones</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(screen.coleccion.addCollection, {
                mail: mail,
              });
            }}
          >
            <Icon
              type="material-community"
              name="book-plus-multiple"
              style={styles.header__icon}
              color={theme.primary}
            ></Icon>
          </TouchableOpacity>
        </View>

        {misColecciones.length === 0 ? (
          <Text>No tenes colecciones todavia</Text>
        ) : (
          <View>
            {misColecciones.map((coleccion, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => irAScreenColeccion(coleccion.nombre)}
                style={estilos.coleccion_container}
              >
                <Image
                  style={estilos.coleccion__imagen}
                  source={{ uri: `${coleccion.imagen}` }}
                ></Image>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </>
  );
}

const estilos = StyleSheet.create({
  coleccion_container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    width: "100%",
    shadowRadius: 4,
    marginBottom: 15,
    padding: 10,
    elevation: 3,
    alignItems: "center",
  },
  coleccion__imagen: {
    width: "100%",
    resizeMode: "contain",
    height: 200,
  },
});
