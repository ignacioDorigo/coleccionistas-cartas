import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { styles } from "./ElegirSetYugioh.styles";
import { ModalCarga } from "../../../components/ModalCarga";
import axios from "axios";
import { Image } from "@rneui/themed";
import { TouchableOpacity } from "react-native";

export function ElegirSetYugioh() {
  const [modal, setModal] = useState(false);
  const [sets, setSets] = useState([]);

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
          <TouchableOpacity key={index} style={styles.setContainer}>
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
