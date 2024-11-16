import React, { useContext, useEffect, useState } from "react";
import {
  View,
  TextInput,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Icon } from "@rneui/themed";
import axios from "axios";
import { ipHost, screen } from "../../../utils";
import { styles } from "./MarketPlaceScreen.styles";
import { RecargarContext } from "../../../context/RecargarContext";
import { useNavigation } from "@react-navigation/native";

export function MarketPlaceScreen() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [imagenesPublicacion, setImagenesPublicacion] = useState({});
  const [indiceImagenActual, setIndiceImagenActual] = useState({});
  const [searchText, setSearchText] = useState(""); // Estado para el texto de búsqueda
  const { marketplace } = useContext(RecargarContext);
  const navigation = useNavigation();

  useEffect(() => {
    buscarPublicaciones();
  }, [marketplace]);

  const buscarPublicaciones = async () => {
    try {
      const response = await axios.get(
        `http://${ipHost}:8080/coleccionistas/publicaciones`
      );
      setPublicaciones(response.data);
      response.data.forEach((publicacion) => {
        obtenerImagenes(publicacion.id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerImagenes = async (idPublicacion) => {
    try {
      const response = await axios.get(
        `http://${ipHost}:8080/coleccionistas/imagenes/${idPublicacion}`
      );
      setImagenesPublicacion((prevImagenes) => ({
        ...prevImagenes,
        [idPublicacion]: response.data,
      }));
      setIndiceImagenActual((prevIndices) => ({
        ...prevIndices,
        [idPublicacion]: 0,
      }));
    } catch (error) {
      console.log(
        `Error al obtener imágenes para la publicación ${idPublicacion}:`,
        error
      );
    }
  };

  const cambiarImagen = (idPublicacion, direccion) => {
    const indiceActual = indiceImagenActual[idPublicacion] || 0;
    const totalImagenes = imagenesPublicacion[idPublicacion]?.length || 0;
    const nuevoIndice =
      (indiceActual + direccion + totalImagenes) % totalImagenes;

    setIndiceImagenActual((prevIndices) => ({
      ...prevIndices,
      [idPublicacion]: nuevoIndice,
    }));
  };

  // Filtra las publicaciones en función del texto de búsqueda
  const publicacionesFiltradas = publicaciones.filter((publicacion) =>
    publicacion.titulo.toLowerCase().includes(searchText.toLowerCase())
  );

  const goToDetalleCard = (publicacion) => {
    navigation.navigate(screen.marketplace.detallePublicacion, {
      publicacion: publicacion,
    });
  };

  return (
    <View style={styles.container}>
      {/* Barra de búsqueda */}
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Buscar por título..."
          style={styles.input}
          value={searchText}
          onChangeText={setSearchText} // Actualiza el texto de búsqueda
        />
        <Icon
          size={30}
          color={"#FFF"}
          containerStyle={styles.icon}
          type="material-community"
          name="magnify"
        />
      </View>

      {/* Publicaciones */}
      <ScrollView style={styles.publicaciones}>
        {publicacionesFiltradas.length === 0 ? (
          <Text>No hay publicaciones</Text>
        ) : (
          publicacionesFiltradas.map((publicacion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.publicacionContainer}
              onPress={() => goToDetalleCard(publicacion)}
            >
              <Text style={styles.publicacionText}>{publicacion.titulo}</Text>
              <Text style={styles.publicacionDetail}>
                {publicacion.descripcion}
              </Text>
              <Text style={styles.priceText}>${publicacion.precio}</Text>

              {/* Carrusel de imágenes */}
              {imagenesPublicacion[publicacion.id]?.length ? (
                <View style={styles.carouselContainer}>
                  <TouchableOpacity
                    onPress={() => cambiarImagen(publicacion.id, -1)}
                  >
                    <Text style={styles.arrow}>{"<"}</Text>
                  </TouchableOpacity>

                  <Image
                    source={{
                      uri: `data:image/jpeg;base64,${
                        imagenesPublicacion[publicacion.id][
                          indiceImagenActual[publicacion.id]
                        ]
                      }`,
                    }}
                    style={styles.carouselImage}
                  />

                  <TouchableOpacity
                    onPress={() => cambiarImagen(publicacion.id, 1)}
                  >
                    <Text style={styles.arrow}>{">"}</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text>No hay imágenes</Text>
              )}
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}
