import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, Image, Alert } from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import { ModalCarga } from "../../../components/ModalCarga";
import { styles } from "./MisSetsYugioh.styles";
import axios from "axios";
import { ipHost } from "../../../utils/ipHost";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { Icon } from "@rneui/themed";

export function MisSetsYugioh() {
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;

  const [modal, setModal] = useState(false);
  const [misSets, setMisSets] = useState([]);
  const [setCompletos, setSetsCompletos] = useState([]);
  const [repintar, setRepintar] = useState(false);
  const [setsCoincidentes, setSetsCoincidentes] = useState([]);
  const navigation = useNavigation();

  const actualizarScreen = () => {
    setRepintar((prevState) => !prevState);
  };

  const mostrarOcultarModal = () => {
    setModal((prevState) => !prevState);
  };

  const buscarMisSets = async () => {
    try {
      const response = await axios.get(
        `http://${ipHost}:8080/coleccionistas/yugioh/misSets?mail=${mail}`
      );
      setMisSets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const buscarTodosSets = async () => {
    try {
      mostrarOcultarModal();
      const response = await axios.get(
        `https://db.ygoprodeck.com/api/v7/cardsets.php`
      );
      setSetsCompletos(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      mostrarOcultarModal();
    }
  };

  const filtrarSetsCoincidentes = () => {
    const idsMisSets = misSets.map((set) => set.id_set);
    const coincidencias = setCompletos.filter((set) =>
      idsMisSets.includes(set.set_name)
    );
    setSetsCoincidentes(coincidencias);
  };

  useEffect(() => {
    buscarTodosSets();
    buscarMisSets();
  }, [repintar]);

  useEffect(() => {
    if (misSets.length > 0 && setCompletos.length > 0) {
      filtrarSetsCoincidentes();
    }
  }, [misSets, setCompletos, repintar]);

  const irAmisCartasSetYugioh = (set) => {
    navigation.navigate(screen.coleccion.misCartasSetYugioh, {
      setName: set.set_name,
    });
  };

  const confirmarEliminarSet = (idSet) => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de que deseas eliminar este set de tu inventario?",
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

  const eliminarSet = async (setName) => {
    try {
      const encodedSetName = encodeURIComponent(setName);
      const response = await axios.delete(
        `http://${ipHost}:8080/coleccionistas/yugioh/eliminarSet?mail=${mail}&idSet=${encodedSetName}`
      );

      // Actualiza el estado local de `misSets`
      const nuevosMisSets = misSets.filter((set) => set.id_set !== setName);
      setMisSets(nuevosMisSets);

      // Recalcula los sets coincidentes con el nuevo estado
      const idsMisSets = nuevosMisSets.map((set) => set.id_set);
      const nuevasCoincidencias = setCompletos.filter((set) =>
        idsMisSets.includes(set.set_name)
      );
      setSetsCoincidentes(nuevasCoincidencias);

      Alert.alert("Éxito", response.data);
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data || "No se pudo eliminar el set."
      );
    }
  };

  return (
    <>
      <ModalCarga isVisible={modal} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.viewHeader}>
          <Text style={styles.header}>Sets Yugioh armados</Text>
        </View>
        {setsCoincidentes.map((set, index) => (
          <TouchableOpacity
            key={index}
            style={styles.setContainer}
            onPress={() => irAmisCartasSetYugioh(set)}
          >
            <Icon
              type="material-community"
              name="close-circle"
              color={"#FF0000"}
              containerStyle={styles.iconEliminar}
              onPress={() => confirmarEliminarSet(set.set_name)}
            />
            <Image
              source={{
                uri:
                  set.set_image ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQumqw6UawRn7rOgAvevIfEnX55015CA-oTeA&s",
              }}
              style={styles.imageSet}
            />
            <View style={styles.setTextContainer}>
              <Text style={styles.setName}>{set.set_name}</Text>
              <Text style={styles.setNumCards}>
                Número de cartas: {set.num_of_cards}
              </Text>
              <Text>Fecha de lanzamiento: {set.tcg_date}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}
