import React, { useEffect, useState } from "react";
import { View, TextInput, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import axios from "axios";
import { ipHost } from "../../../utils";
import { styles } from "./MarketPlaceScreen.styles";

export function MarketPlaceScreen() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [imagenesPublicacion, setImagenesPublicacion] = useState({});
  const [indiceImagenActual, setIndiceImagenActual] = useState({});

  useEffect(() => {
    buscarPublicaciones();
  }, []);

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
        [idPublicacion]: 0, // Índice inicial de la imagen actual para cada publicación
      }));
    } catch (error) {
      console.log(`Error al obtener imágenes para la publicación ${idPublicacion}:`, error);
    }
  };

  const cambiarImagen = (idPublicacion, direccion) => {
    const indiceActual = indiceImagenActual[idPublicacion] || 0;
    const totalImagenes = imagenesPublicacion[idPublicacion]?.length || 0;
    const nuevoIndice = (indiceActual + direccion + totalImagenes) % totalImagenes;

    setIndiceImagenActual((prevIndices) => ({
      ...prevIndices,
      [idPublicacion]: nuevoIndice,
    }));
  };

  return (
    <View style={styles.container}>
      {/* Barra de búsqueda */}
      <View style={styles.searchBar}>
        <TextInput placeholder="Buscar ...." style={styles.input} />
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
        {publicaciones.length === 0 ? (
          <Text>No hay publicaciones</Text>
        ) : (
          publicaciones.map((publicacion, index) => (
            <View key={index} style={styles.publicacionContainer}>
              <Text>ID: {publicacion.id}</Text>
              <Text>Titulo: {publicacion.titulo}</Text>
              <Text>Descripcion: {publicacion.descripcion}</Text>
              <Text>Precio: {publicacion.precio}</Text>

              {/* Carrusel de imágenes */}
              {imagenesPublicacion[publicacion.id]?.length ? (
                <View style={styles.carouselContainer}>
                  <TouchableOpacity onPress={() => cambiarImagen(publicacion.id, -1)}>
                    <Text style={styles.arrow}>{"<"}</Text>
                  </TouchableOpacity>

                  <Image
                    source={{
                      uri: `data:image/jpeg;base64,${imagenesPublicacion[publicacion.id][indiceImagenActual[publicacion.id]]}`,
                    }}
                    style={styles.carouselImage}
                  />

                  <TouchableOpacity onPress={() => cambiarImagen(publicacion.id, 1)}>
                    <Text style={styles.arrow}>{">"}</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text>No hay imágenes</Text>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
