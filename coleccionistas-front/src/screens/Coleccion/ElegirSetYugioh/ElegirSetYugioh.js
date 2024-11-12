import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { styles } from "./ElegirSetYugioh.styles";
import { ModalCarga } from "../../../components/ModalCarga";
import axios from "axios";
import { Button, Image } from "@rneui/themed";
import { TouchableOpacity } from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import { RecargarContext } from "../../../context/RecargarContext";
import { useNavigation } from "@react-navigation/native";
import { ipHost, screen } from "../../../utils";

export function ElegirSetYugioh({ route }) {
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const [sets, setSets] = useState([]);

  // Para pedir el mail
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;

  // Para recargar las paginas
  const { recargarColecciones } = useContext(RecargarContext);

  // Para saber qué colección se creó
  const { coleccion } = route.params;

  useEffect(() => {
    buscarSets();
  }, []);

  const buscarSets = async () => {
    try {
      mostrarOcultarModal();
      const response = await axios.get(
        `https://db.ygoprodeck.com/api/v7/cardsets.php`
      );
      setSets(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      mostrarOcultarModal();
    }
  };

  const handleMazoPress = (setName) => {
    // Codificar el nombre del set antes de enviarlo al backend
    const encodedSetName = encodeURIComponent(setName);
    Alert.alert(
      "Confirmación",
      "¿Está seguro que quiere crear una colección de este mazo?",
      [
        {
          text: "CANCELAR",
          onPress: () => console.log("Operación Cancelada"),
          style: "cancel",
        },
        {
          text: "ACEPTO",
          onPress: () => {
            axios
              .post(
                `http://${ipHost}:8080/coleccionistas/yugioh/crearColeccion?mail=${mail}&setName=${encodedSetName}&idColeccion=${coleccion.id}`
              )
              .then((response) => {
                recargarColecciones();
                navigation.navigate(screen.coleccion.cartasSetYugioh, {
                  coleccion,
                  setName,
                });
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

  const mostrarOcultarModal = () => {
    setModal((prevState) => !prevState);
  };

  return (
    <>
      <ModalCarga isVisible={modal} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.viewHeader}>
          <Text style={styles.header}>Sets Disponibles</Text>
        </View>
        {sets.map((set, index) => (
          <TouchableOpacity
            key={index}
            style={styles.setContainer}
            onPress={() => handleMazoPress(set.set_name)}
          >
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
                {`${set.num_of_cards} cartas`}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}
