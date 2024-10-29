import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

// Contexto
import { AuthContext } from "../../../context/AuthContext";
import { RecargarContext } from "../../../context/RecargarContext";

import { styles } from "./CartasSet.styles";

import { ModalCarga } from "../../../components/ModalCarga";
import { Button, Icon } from "@rneui/themed";
import { ipHost } from "../../../utils/ipHost";

export function CartasSet({ route, navigation }) {
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;

  const { mazo } = route.params;

  const [cards, setCards] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    buscarCartaSet();
  }, []);

  const buscarCartaSet = async () => {
    try {
      setVisible(true);
      const response = await axios.get(
        `https://api.pokemontcg.io/v2/cards/?q=id:${mazo.id}&select=id,name,images`,
        {
          headers: {
            Authorization: `Bearer d9a5dcd2-e55a-4842-a1ec-278e15879a1d`, // ACA PONGAN SU API KEY AMIGOS ,DESDPUES DEL BEARER (DESPUES ME FIJO COMO PONERLO EN BACK)
          },
        }
      );
      setCards(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setVisible(false);
    }
  };

  const AgregarCartaAColeccion = (idCard) => {
    Alert.alert(
      "Confirmación",
      "¿Está seguro que quiere agregar esta carta a tu mazo?",
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
                `http://${ipHost}:8080/coleccionistas/agregarCarta?mail=${mail}&idSet=${mazo.id}&idCard=${idCard}`
              )
              .then((response) => Alert.alert("Exito", response.data))
              .catch((error) => Alert.alert("Error", `${error.response.data}`));
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <ModalCarga isVisible={visible} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.viewHeader}>
          <Text style={styles.header}>Mazo {mazo.name}</Text>
        </View>
        {cards.map((card, index) => (
          <View key={index} style={styles.touchable}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={{ uri: `${card.images.large}` }}
            />
            <Button
              iconPosition="left"
              icon={
                <Icon
                  type="material-community"
                  name="account"
                  color={"#FFFFFF"}
                ></Icon>
              }
              containerStyle={styles.btnContainer}
              buttonStyle={styles.btn}
              title={"   Agregar al inventario"}
              onPress={() => AgregarCartaAColeccion(card.id)}
            />
          </View>
        ))}
      </ScrollView>
    </>
  );
}
