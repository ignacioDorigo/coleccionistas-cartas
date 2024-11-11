import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import axios from "axios";

import { ModalCarga } from "../../../components/ModalCarga";

// Contexto
import { AuthContext } from "../../../context/AuthContext";
import { styles } from "./MisSetsPokemon.styles";
import { ipHost } from "../../../utils/ipHost";
import { Icon } from "@rneui/themed";

export function MisSetsPokemon({ navigation }) {
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;
  // console.log(mail);

  const [misSets, setMisSets] = useState([]);
  const [visible, setVisible] = useState(false);
  const [reload, setReload] = useState(false);

  const actualizarScreen = () => {
    setReload((prevState) => !prevState);
  };

  // Me busca los sets que arme
  useEffect(() => {
    buscarMisSets();
  }, [reload]);

  const buscarMisSets = async () => {
    try {
      setVisible(true);
      const response = await axios.get(
        `http:/${ipHost}:8080/coleccionistas/misSets?mail=${mail}`
      );
      const idsSetsMios = response.data;
      const misSetsObjetos = [];
      for (let index = 0; index < idsSetsMios.length; index++) {
        const datosSet = idsSetsMios[index];
        const response2 = await axios.get(
          `https://api.pokemontcg.io/v2/sets?q=id:${datosSet.id_set}`
        );
        const datosCompletosSet = response2.data.data[0];
        misSetsObjetos.push(datosCompletosSet);
      }
      setMisSets(misSetsObjetos);
      setVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarSet = async (idSet) => {
    try {
      const response = await axios.delete(
        `http://${ipHost}:8080/coleccionistas/pokemon/eliminarSet?mail=${mail}&idSet=${idSet}`
      );
      console.log(response.data);
      actualizarScreen();
    } catch (error) {
      Alert.alert("Error", error.response.data);
    }
  };

  const confirmarEliminarSet = (idSet) => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de que deseas eliminar este set?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => eliminarSet(idSet),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <>
      <ModalCarga isVisible={visible} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.viewHeader}>
          <Text style={styles.header}>Sets Armados</Text>
        </View>

        <>
          {misSets.length === 0 ? (
            <Text>No tenes sets creados</Text>
          ) : (
            misSets.map((set, index) => (
              <View key={index}>
                <TouchableOpacity
                  style={styles.touchable}
                  onPress={() => {
                    navigation.navigate("MisCartasSet", {
                      set: set,
                      title: `${set}`,
                    });
                  }}
                >
                  <Text style={styles.idSet}>{set.id}</Text>
                  <Image
                    source={{ uri: `${set.images.logo}` }}
                    style={styles.image}
                  />
                  <Text style={styles.PrintedTotal}>{set.printedTotal}</Text>
                </TouchableOpacity>
                <Icon
                  type="material-community"
                  name="close-circle"
                  color={"#FF0000"}
                  containerStyle={styles.iconEliminar}
                  onPress={() => confirmarEliminarSet(set.id)}
                />
              </View>
            ))
          )}
        </>
      </ScrollView>
    </>
  );
}
