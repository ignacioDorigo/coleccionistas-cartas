import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { styles } from "./MisCartaSet.styles";
import axios from "axios";
import { Button, Icon, Switch } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { ModalCarga } from "../../../components/ModalCarga";

import { ipHost } from "../../../utils/ipHost";

// Contextos
import { AuthContext } from "../../../context/AuthContext";
import { RecargarContext } from "../../../context/RecargarContext";

export function MisCartasSet({ route }) {
  //De aca salgo el mail
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;
  // Recibo el set que eligio el user
  const { set } = route.params;

  // De alguna manera tengo que recargar el screen de favoritos, entonces cree un context de eso
  const { recargarFavoritos } = useContext(RecargarContext);
  // Modal para imagen ampliada
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [misFavoritosIds, setMisFavoritosIds] = useState([]);

  const navigation = useNavigation();

  const [mazoMio, setMazoMio] = useState([]);
  const [mazoCompleto, setMazoCompleto] = useState([]); // incluye mis cartas y las que no tengo

  // Para recargar la screen
  const [reload, setReload] = useState(false);

  // Para la visibilidad del modal
  const [visible, setVisible] = useState(false);

  // Estado del switch
  const [checked, setChecked] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const toggleSwitch = () => {
    setChecked(!checked);
  };

  const recargarScreen = () => {
    setReload((prevState) => !prevState);
  };

  // Este useEffect es para traer los datos de las cartas que tengo yo (id, id_set, id_card, mail)
  useEffect(() => {
    navigation.setOptions({ title: "Inventario " + set.id });
    buscarMisFavoritos();
    setVisible(true);
    axios
      .get(
        `http://${ipHost}:8080/coleccionistas/misCartasSet?mail=${mail}&idSet=${set.id}`
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

  const agregarCardInventario = async (idCard) => {
    try {
      setVisible(true);
      const response = await axios.post(
        `http://${ipHost}:8080/coleccionistas/agregarCarta?mail=${mail}&idSet=${set.id}&idCard=${idCard}`
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
        `http://${ipHost}:8080/coleccionistas/eliminarCartaInventario?mail=${mail}&idSet=${set.id}&idCard=${idCard}`
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

  const handleSearchChange = (text) => {
    setSearchText(text);

    // Filtrar solo cartas cuyos nombres empiezan con el texto de búsqueda
    const suggestions = mazoCompleto.filter((card) =>
      card.name.toLowerCase().startsWith(text.toLowerCase())
    );
    setFilteredSuggestions(suggestions);
    setShowSuggestions(true);
  };

  const handleSuggestionSelect = (name) => {
    setSearchText(name);
    setFilteredSuggestions([]);
  };

  const handleSubmitEditing = () => {
    setShowSuggestions(false);
  };

  // ------------------ TODO LO DE FAVORITOS ------------------
  const buscarMisFavoritos = async () => {
    try {
      const response = await axios.get(
        `http://${ipHost}:8080/coleccionistas/misFavoritosPokemon?mail=${mail}`
      );
      const misFavoritos = response.data;
      const misFavoritosIdsss = misFavoritos.map(
        (favorito) => favorito.id_card
      );
      setMisFavoritosIds(misFavoritosIdsss);
      // console.log("Mis favoritos");
      // console.log(misFavoritosIdsss);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const confirmarAgregarAfavoritos = async (idCard) => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de que queres agregar esta carta a tus favoritos?",
      [
        {
          text: "Cancelar",
          style: "destructive",
        },
        {
          text: "Agregar",
          style: "default",
          onPress: () => agregarCardFavoritos(idCard),
        },
      ],
      { cancelable: true }
    );
  };

  const agregarCardFavoritos = async (idCard) => {
    try {
      setVisible(true);
      const response = await axios.post(
        `http://${ipHost}:8080/coleccionistas/agregarFavoritoPokemon?idCard=${idCard}&mail=${mail}`
      );
      Alert.alert("Exito", response.data);
      recargarScreen();
      recargarFavoritos();
    } catch (error) {
      Alert.alert("Error", error.response.data);
    } finally {
      setVisible(false);
    }
  };

  const estaEnFavoritos = (cardId, favoritos) => {
    // console.log(favoritos.includes(cardId));
    return favoritos.includes(cardId);
  };

  const confirmarEliminarAfavoritos = async (idCard) => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de que queres eliminar esta carta de tus favoritos?",
      [
        {
          text: "Cancelar",
          style: "destructive",
        },
        {
          text: "Eliminar",
          style: "default",
          onPress: () => eliminarCardFavoritos(idCard),
        },
      ],
      { cancelable: true }
    );
  };

  const eliminarCardFavoritos = async (idCard) => {
    try {
      setVisible(true);
      const response = await axios.delete(
        `http://${ipHost}:8080/coleccionistas/eliminarFavoritoPokemon?idCard=${idCard}&mail=${mail}`
      );
      Alert.alert("Exito", response.data);
      recargarScreen();
      recargarFavoritos();
    } catch (error) {
      Alert.alert("Error", error.response.data);
    } finally {
      setVisible(false);
    }
  };

  // -----------------------------------------------------------
  return (
    <>
      {mazoCompleto.length === 0 ? (
        <ModalCarga />
      ) : (
        <>
          <ModalCarga isVisible={visible} />

          <View style={styles.container}>
            <View style={styles.header__container}>
              <Text style={styles.header__title}>Set {set.id}</Text>
            </View>
            <View style={styles.searchContainer}>
              <Icon
                type="material-community"
                name="magnify"
                size={20}
                color="#000"
                containerStyle={styles.iconSearch}
              />
              <TextInput
                style={styles.searchBar}
                placeholder="Buscar carta por nombre..."
                value={searchText}
                onChangeText={handleSearchChange}
                onSubmitEditing={handleSubmitEditing}
              />
            </View>

            {showSuggestions && filteredSuggestions.length > 0 && (
              <FlatList
                style={styles.suggestionsList}
                data={filteredSuggestions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSuggestionSelect(item.name)}
                  >
                    <Text style={styles.suggestionItem}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            )}

            <ScrollView style={styles.scrollView}>
              <View style={styles.viewSwitch}>
                <Switch
                  value={checked}
                  onValueChange={(value) => setChecked(value)}
                />
                <Text> Ver solo las que me faltan</Text>
              </View>

              {mazoCompleto
                .filter((card) => (checked ? !mazoMio.includes(card.id) : true))
                .filter((card) =>
                  card.name.toLowerCase().startsWith(searchText.toLowerCase())
                )

                .map((card, index) => (
                  <View key={index} style={styles.cardContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedImage(card.images.small);
                        setIsModalVisible(true);
                      }}
                    >
                      <Image
                        style={styles.cardImage}
                        source={{ uri: card.images.small }}
                      />
                    </TouchableOpacity>

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

                    {estaEnFavoritos(card.id, misFavoritosIds) ? (
                      <Icon
                        containerStyle={styles.iconoFavoritos}
                        iconStyle={styles.iconoCorazonAgregado}
                        raised
                        name="heart"
                        type="material-community"
                        color="#FFFFFF"
                        onPress={() => confirmarEliminarAfavoritos(card.id)}
                      />
                    ) : (
                      <Icon
                        containerStyle={styles.iconoFavoritos}
                        iconStyle={styles.iconoCorazonFaltante}
                        raised
                        reverse
                        name="heart-outline"
                        type="material-community"
                        color="#FFFFFF"
                        onPress={() => confirmarAgregarAfavoritos(card.id)}
                      />
                    )}

                    <View style={styles.botonesInventario}>
                      {mazoMio.includes(card.id) ? (
                        // Mostrar solo el botón "Eliminar" si ya tienes la carta
                        <Button
                          buttonStyle={styles.btnEliminar}
                          containerStyle={styles.btnContainer}
                          title="Eliminar del inventario"
                          onPress={() => eliminarCardInventario(card.id)}
                        />
                      ) : (
                        <Button
                          buttonStyle={styles.btnAgregar}
                          containerStyle={styles.btnContainer}
                          title="Agregar al inventario"
                          onPress={() => agregarCardInventario(card.id)}
                        />
                      )}
                    </View>
                  </View>
                ))}
            </ScrollView>

            {/* Modal para mostrar la imagen ampliada */}
          </View>
          <Modal
            visible={isModalVisible}
            transparent={true}
            onRequestClose={() => setIsModalVisible(false)}
          >
            <View style={styles.overlayContainer}>
              <TouchableOpacity
                style={styles.overlayBackground}
                onPress={() => setIsModalVisible(false)}
              />
              <View style={styles.modalImageContainer}>
                <Image
                  style={[styles.modalImage, { resizeMode: "contain" }]}
                  source={{ uri: selectedImage }}
                />
              </View>
            </View>
          </Modal>
        </>
      )}
    </>
  );
}
