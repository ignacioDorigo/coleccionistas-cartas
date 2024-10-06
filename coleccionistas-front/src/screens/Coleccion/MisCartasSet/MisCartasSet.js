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

  // Para recargar la screen
  const [reload, setReload] = useState(false);

  // Para la visibilidad del modal
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
      setVisible(true);
      const response = await axios.post(
        `http://192.168.1.14:8080/coleccionistas/agregarFavoritoPokemon?idCard=${idCard}&mail=${mail}`
      );
      Alert.alert("Exito", response.data);
      recargarFavoritos();
    } catch (error) {
      Alert.alert("Error", error.response.data);
      recargarFavoritos();
    } finally {
      setVisible(false);
    }
  };

  const agregarCardInventario = async (idCard) => {
    try {
      setVisible(true);
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
    } finally {
      setVisible(false);
    }
  };

  const eliminarCardInventario = async (idCard) => {
    try {
      setVisible(true);
      const response = await axios.delete(
        `http://192.168.1.14:8080/coleccionistas/eliminarCartaInventario?mail=${mail}&idSet=${set.id_set}&idCard=${idCard}`
      );
      Alert.alert(
        "Exito",
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
    } finally {
      setVisible(false);
    }
  };

  return (
    <>
      {mazoCompleto.length === 0 ? (
        <ModalCarga />
      ) : (
        <>
          <ModalCarga isVisible={visible} />

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
                  <View style={styles.botonesInventario}>

                    <Button buttonStyle={styles.btnAgregar} cont
                      title="Agregar alll inventario"
                      onPress={() => agregarCardInventario(card.id)}
                    />
                    <Button buttonStyle={styles.btnEliminar}
                      title="Eliminar del inventario"
                      onPress={() => eliminarCardInventario(card.id)}
                    />
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
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
    height: 350,
    marginBottom: 5,
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
  botonesInventario:{
    flexDirection:'row',
    width:"50%",
    
    justifyContent:'center',
  },

  btnAgregar:{
    flex:1,
    backgroundColor:'green',
  },
  btnEliminar:{
    backgroundColor:'red',
    flex:1,
  }
  
});
