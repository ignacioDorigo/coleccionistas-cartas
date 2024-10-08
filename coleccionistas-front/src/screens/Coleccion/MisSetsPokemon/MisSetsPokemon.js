import React, { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import axios from "axios";

import { ModalCarga } from "../../../components/ModalCarga";

// Contexto
import { AuthContext } from "../../../context/AuthContext";
import { styles } from "./MisSetsPokemon.styles";

export function MisSetsPokemon({ navigation }) {
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;

  const [misSets, setMisSets] = useState([]);
  const [visible, setVisible] = useState(false);

  // Me busca los sets que arme
  useEffect(() => {
    buscarMisSets();
  }, []);

  const buscarMisSets = async () => {
    try {
      setVisible(true);
      const response = await axios.get(
        `http:/192.168.1.14:8080/coleccionistas/misSets?mail=${mail}`
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

  return (
    <>
      <ModalCarga isVisible={visible} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.viewHeader}>
          <Text style={styles.header}>Sets Armados</Text>
        </View>

        {misSets.map((set, index) => (
          <TouchableOpacity
            style={styles.touchable}
            key={index}
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
        ))}
      </ScrollView>
    </>
  );
}
