import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import { ModalCarga } from "../../../components/ModalCarga";
import { styles } from "./MisSetsYugioh.styles";
import axios from "axios";
import { ipHost } from "../../../utils/ipHost";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

export function MisSetsYugioh() {
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;

  const [modal, setModal] = useState(false);
  const [misSets, setMisSets] = useState([]);
  const [setCompletos, setSetsCompletos] = useState([]);
  const [setsCoincidentes, setSetsCoincidentes] = useState([]); // Estado para los sets coincidentes
  const navigation = useNavigation();

  const mostrarOcultarModal = () => {
    setModal((prevState) => !prevState);
  };

  const buscarMisSets = async () => {
    try {
      const response = await axios.get(
        `http://${ipHost}:8080/coleccionistas/yugioh/misSets?mail=${mail}`
      );
      const sets = response.data;
      console.log("------------------ MIS SETS ------------------ ");
      sets.map((set) => console.log(set.id_set));
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
      const sets = response.data;
      console.log("------------------ SETS API ------------------ "); 
      sets.map((set) => {
        if (set.set_name.includes("2-")) {
          console.log(set.set_name);
        }
      });
      setSetsCompletos(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      mostrarOcultarModal();
    }
  };

  // Filtra los sets coincidentes
  const filtrarSetsCoincidentes = () => {
    const idsMisSets = misSets.map((set) => set.id_set);
    const coincidencias = setCompletos.filter(
      (set) => idsMisSets.includes(set.set_name) // O `set.set_code`, si el campo coincide
    );
    setSetsCoincidentes(coincidencias);
  };

  useEffect(() => {
    buscarTodosSets();
    buscarMisSets();
  }, []);

  // Ejecuta el filtro cuando cambian los sets
  useEffect(() => {
    if (misSets.length > 0 && setCompletos.length > 0) {
      filtrarSetsCoincidentes();
    }
  }, [misSets, setCompletos]);

  const irAmisCartasSetYugioh = (set) => {
    navigation.navigate(screen.coleccion.misCartasSetYugioh, { set: set });
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
