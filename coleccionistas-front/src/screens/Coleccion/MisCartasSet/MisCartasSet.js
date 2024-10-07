import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";

import { styles } from "./MisCartaSet.styles";

import axios from "axios";
import { Button, Icon, Switch } from "@rneui/themed";

// Contexto
import { AuthContext } from "../../../context/AuthContext";
import { RecargarContext } from "../../../context/RecargarContext";

// Modal de Carga
import { ModalCarga } from "../../../components/ModalCarga";
import { useNavigation } from "@react-navigation/native";

export function MisCartasSet({ route }) {
  const navigation = useNavigation();
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

  // Estado del switch
  const [checked, setChecked] = useState(false);
  const toggleSwitch = () => {
    setChecked(!checked);
  };

  const recargarScreen = () => {
    setReload((prevState) => !prevState);
  };

  // Este useEffect es para traer los datos de las cartas que tengo yo (id, id_set, id_card, mail)
  useEffect(() => {
    navigation.setOptions({ title: "Inventario " + set.id });
    setVisible(true);
    axios
      .get(
        `http://192.168.1.14:8080/coleccionistas/misCartasSet?mail=${mail}&idSet=${set.id}`
      )
      .then((response) => setMazoMio(response.data.map((card) => card.id_card)))
      .catch((error) => console.log(error));
    setVisible(false);
  }, [reload]);

  // Este useEffect es para traer todas las cartas de un set
  useEffect(() => {
    setVisible(true);
    axios
      .get(
        `https://api.pokemontcg.io/v2/cards/?q=id:${set.id}&select=id,name,images`,
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
        `http://192.168.1.14:8080/coleccionistas/agregarCarta?mail=${mail}&idSet=${set.id}&idCard=${idCard}`
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
        `http://192.168.1.14:8080/coleccionistas/eliminarCartaInventario?mail=${mail}&idSet=${set.id}&idCard=${idCard}`
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
            <Text style={styles.title}>Tus Cartas Del Set {set.id}</Text>

            <ScrollView style={styles.scrollView}>
              <View style={styles.viewSwitch}>
                <Switch value={checked} onValueChange={(value) => setChecked(value)} />
                <Text> Ver solo las que me faltan</Text>
              </View>

              {mazoCompleto
                .filter((card) => (checked ? !mazoMio.includes(card.id) : true)) // Filtrar cartas cuando el switch está activo
                .map((card, index) => (
                  <View key={index} style={styles.cardContainer}>
                    <Image
                      style={styles.cardImage}
                      source={{ uri: card.images.small }}
                    />

                    {mazoMio.includes(card.id) ? (
                      <Icon
                        type="material-community"
                        name="trophy"
                        color={"#FFD700"}
                        raised
                        containerStyle={styles.iconoTrophy}
                      />
                    ) : (
                      <Text style={styles.noTenes}>No la tienes</Text>
                    )}

                    <Icon
                      containerStyle={styles.iconoFavoritos}
                      raised
                      reverse
                      name="heart-plus"
                      type="material-community"
                      color="#240046"
                      onPress={() => agregarCardFavoritos(card.id)}
                    />

                    <View style={styles.botonesInventario}>
                      <Button
                        buttonStyle={styles.btnAgregar}
                        containerStyle={styles.btnContainer}
                        title="Agregar al inventario"
                        onPress={() => agregarCardInventario(card.id)}
                      />
                      <Button
                        buttonStyle={styles.btnEliminar}
                        containerStyle={styles.btnContainer}
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
