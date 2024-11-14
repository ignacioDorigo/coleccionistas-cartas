import React, { useContext, useEffect, useState } from "react";
import { View, Text, Alert, FlatList, Image } from "react-native";
import { styles } from "./ElegirSetYugioh.styles";
import { ModalCarga } from "../../../components/ModalCarga";
import axios from "axios";
import { Button } from "@rneui/themed";
import { TouchableOpacity } from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import { RecargarContext } from "../../../context/RecargarContext";
import { useNavigation } from "@react-navigation/native";
import { ipHost, screen } from "../../../utils";

export function ElegirSetYugioh({ route }) {
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [misSets, setMisSets] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;
  const [reload, setReload] = useState(false);

  const repintarScreen = () => {
    setReload((prevState) => !prevState);
  };

  // Para recargar las paginas
  const { recargarColecciones } = useContext(RecargarContext);

  // Para saber qué colección se creó
  const { coleccion } = route.params;

  const buscarMisSetsYugioh = async () => {
    try {
      const response = await axios.get(
        `http://${ipHost}:8080/coleccionistas/yugioh/misSets?mail=${mail}`
      );
      const setsId = response.data.map((objeto) => objeto.id_set);
      setMisSets(setsId);
    } catch (error) {
      console.log("SCREEN ELEGIR SET YUGIOH :" + error);
    }
  };

  function tengoSet(item, sets) {
    // console.log(item.set_name);
    return sets.includes(item.set_name);
  }

  useEffect(() => {
    buscarMisSetsYugioh();
    buscarSets();
  }, [page, reload]);

  const buscarSets = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      mostrarOcultarModal();
      const response = await axios.get(
        `https://db.ygoprodeck.com/api/v7/cardsets.php`,
        {
          params: { page: page, per_page: 20 }, // Llamada paginada
        }
      );
      if (response.data.length > 0) {
        setSets((prevSets) => [...prevSets, ...response.data]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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

  const mostrarOcultarModal = () => {
    setModal((prevState) => !prevState);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.setContainer,
        tengoSet(item, misSets)
          ? { ...styles.tengoSet }
          : { ...styles.noTengoSet },
      ]}
      onPress={() => handleMazoPress(item.set_name)}
    >
      {tengoSet(item.set_name, misSets)}
      <Image
        source={{
          uri:
            item.set_image ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQumqw6UawRn7rOgAvevIfEnX55015CA-oTeA&s",
        }}
        style={styles.imageSet}
      />
      <View style={styles.setTextContainer}>
        <Text style={styles.setName}>{item.set_name}</Text>
        <Text style={styles.setNumCards}>{`${item.num_of_cards} cartas`}</Text>
      </View>
    </TouchableOpacity>
  );

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(page + 1);
    }
  };

  return (
    <>
      <ModalCarga isVisible={modal} />
      <FlatList
        data={sets}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.container}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <Text>Cargando...</Text> : null} // Mostrar mensaje mientras carga
      />
    </>
  );
}
