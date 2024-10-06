import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { Button } from "@rneui/themed";

// Contexto
import { AuthContext } from "../../../context/AuthContext";
import { RecargarContext } from "../../../context/RecargarContext";

// Fichero Screen
import { screen } from "../../../utils";

// Modal de Carga
import { ModalCarga } from "../../../components/ModalCarga";

export function MisCartasSet({ route }) {
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;
  const { recargarFavoritos } = useContext(RecargarContext);

  const { set } = route.params;

  const [mazoMio, setMazoMio] = useState([]);
  const [mazoCompleto, setMazoCompleto] = useState([]);

  const [reload, setReload] = useState(false);
  const [visible, setVisible] = useState(false);

  const recargarScreen = () => {
    setReload((prevState) => !prevState);
  };

  useEffect(() => {
    setVisible(true);
    axios
      .get(
        `http://192.168.1.14:8080/coleccionistas/misCartasSet?mail=${mail}&idSet=${set.id_set}`
      )
      .then((response) => setMazoMio(response.data.map((card) => card.id_card)))
      .catch((error) => console.log(error));
    setVisible(false);
  }, [reload]);

  useEffect(() => {
    setVisible(true);
    axios
      .get(
        `https://api.pokemontcg.io/v2/cards/?q=id:${set.id_set}&select=id,name,images`,
        {
          headers: {
            Authorization: `Bearer d9a5dcd2-e55a-4842-a1ec-278e15879a1d`, // Reemplaza con tu API key
          },
        }
      )
      .then((response) => setMazoCompleto(response.data.data))
      .catch((error) => console.log(error));
    setVisible(false);
  }, []);

  const agregarCardFavoritos = async (idCard) => {
    try {
      const response = await axios.post(
        `http://192.168.1.14:8080/coleccionistas/agregarFavoritoPokemon?idCard=${idCard}&mail=${mail}`
      );
      Alert.alert("Exito", response.data);
      recargarFavoritos();
    } catch (error) {
      Alert.alert("Error", error.response.data);
      recargarFavoritos();
    }
  };

  const agregarCardInventario = async (idCard) => {
    try {
      const response = await axios.post(
        `http://192.168.1.14:8080/coleccionistas/agregarCarta?mail=${mail}&idSet=${set.id_set}&idCard=${idCard}`
      );
      Alert.alert(
        "Éxito",
        response.data,
        [
          {
            text: "OK",
            onPress: () => recargarScreen(), // Aquí es donde se ejecuta console.log
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      Alert.alert("Error", error.response.data);
    }
  };

  const eliminarCardInventario = async (idCard) => {
    try {
      console.log("carta eliminada");
    } catch (error) {
      Alert.alert("Error", error.response.data);
    }
  };

  return (
    <>
      {mazoCompleto.length === 0 ? (
        <ModalCarga texto={"BUSCANDO LAS CARTAS DEL SET"} />
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Mis Cartas</Text>
          <ScrollView style={styles.scrollView}>
            {mazoCompleto.map((card, index) => (
              <View key={index} style={styles.cardContainer}>
                <Image
                  resizeMode="contain"
                  style={styles.cardImage}
                  source={{ uri: card.images.small }}
                />
                {mazoMio.includes(card.id) ? (
                  <Text style={styles.highlightedText}>La tenes</Text>
                ) : (
                  <Text style={styles.noTenes}>No la tenes</Text>
                )}
                <Button
                  title="Agregar a favoritos"
                  onPress={() => agregarCardFavoritos(card.id)}
                />
                <Button
                  title="Agregar a mi inventario"
                  onPress={() => agregarCardInventario(card.id)}
                />
                <Button
                  title="Eliminar de a mi inventario"
                  onPress={() => eliminarCardInventario(card.id)}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      )}
      <ModalCarga isVisible={visible} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  cardContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  cardImage: {
    width: "100%",
    height: 350, // Cambia la altura si es necesario
    marginBottom: 5, // Espaciado entre la imagen y el texto
  },
  highlightedText: {
    padding: 4,
    color: "white",
    backgroundColor: "green",
    fontWeight: "bold",
    marginTop: 5,
    width: "70%",
    textAlign: "center",
  },
  noTenes: {
    padding: 4,
    color: "white",
    backgroundColor: "red",
    fontWeight: "bold",
    marginTop: 5,
    width: "70%",
    textAlign: "center",
  },
});
