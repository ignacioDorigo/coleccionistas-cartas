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
import { ipHost, screen } from "../../../utils";
import { AuthContext } from "../../../context/AuthContext";
import { RecargarContext } from "../../../context/RecargarContext";
import { styles } from "./ElegirSetPokemon.styles";
import { Switch } from "@rneui/themed";

export function ElegirSetPokemon({ route, navigation }) {
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;
  const { recargarColecciones } = useContext(RecargarContext);
  const { coleccion } = route.params;
  const [mazosDisponibles, setMazosDisponibles] = useState([]);
  const [visible, setVisible] = useState(false);
  const [misSets, setMisSets] = useState([]);
  const [reload, setReload] = useState(false);
  const [mostrarSoloObtenidas, setMostrarSoloObtenidas] = useState(false);

  const clickSwitch = () => {
    setMostrarSoloObtenidas((prevState) => !prevState);
  };

  const repintarScreen = () => {
    setReload((prevState) => !prevState);
  };

  useEffect(() => {
    buscarSetsDisponibles();
    buscarMisSetsPokemon();
  }, [reload]);

  const buscarSetsDisponibles = async () => {
    try {
      setVisible(true);
      const response = await axios.get(`https://api.pokemontcg.io/v2/sets`);
      setMazosDisponibles(response.data.data);
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
                repintarScreen();
              })
              .catch((error) =>
                Alert.alert("Error", `${error.response?.data || error.message}`)
              );
          },
        },
      ],
      { cancelable: false }
    );
  };

  const buscarMisSetsPokemon = async () => {
    try {
      const response = await axios.get(
        `http://${ipHost}:8080/coleccionistas/misSets?mail=${mail}`
      );
      const sets = response.data;
      const idSetPropios = sets.map((set) => set.id_set);
      setMisSets(idSetPropios);
    } catch (error) {
      console.log(error);
    }
  };

  function tengoSet(set, sets) {
    return sets.includes(set);
  }

  return (
    <>
      <ModalCarga isVisible={visible} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header__view}>
          <Text style={styles.header__title}>Sets Disponibles</Text>
          <Text style={styles.header_subtitle}>
            Estos son todos los sets de Pokemon, elegí uno
          </Text>
        </View>
        <View style={styles.view__switch}>
          <Switch value={mostrarSoloObtenidas} onValueChange={clickSwitch} />
          <Text style={styles.view__switch__texto}>
            {mostrarSoloObtenidas
              ? "Mostrando solo obtenidas"
              : "Mostrar todos"}
          </Text>
        </View>

        {mazosDisponibles
          .filter((mazo) => !mostrarSoloObtenidas || tengoSet(mazo.id, misSets))
          .map((mazo, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.touchable,
                tengoSet(mazo.id, misSets)
                  ? { ...styles.tengoSet }
                  : { ...styles.noTengoSet },
              ]}
              onPress={() => handleMazoPress(mazo)}
            >
              <Image style={styles.image} source={{ uri: mazo.images.logo }} />
            </TouchableOpacity>
          ))}
      </ScrollView>
    </>
  );
}
