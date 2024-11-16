import { Button } from "@rneui/themed";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { ipHost } from "../../../utils";
import { styles } from "./DetallePublicacion.styles";

export function DetallePublicacion({ route }) {
  const [imagenesPublicacion, setImagenesPublicacion] = useState({});
  const [indiceImagenActual, setIndiceImagenActual] = useState({});
  const { publicacion } = route.params;

  useEffect(() => {
    obtenerImagenes(publicacion.id);
  }, []);

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

  const comprar = () => {
    console.log("Comprando .......");
  };

  return (
    <ScrollView>
      {imagenesPublicacion[publicacion.id]?.length ? (
        <View style={styles.carouselContainer}>
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
            style={styles.arrowLeft}
            onPress={() => cambiarImagen(publicacion.id, -1)}
          >
            <Text style={styles.arrow}>{"<"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.arrowRight}
            onPress={() => cambiarImagen(publicacion.id, 1)}
          >
            <Text style={styles.arrow}>{">"}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>No hay imágenes</Text>
      )}
      <View style={styles.descripcion}>
        <Text style={styles.titulo}>{publicacion.titulo}</Text>
        <Text style={styles.descripcionTexto}>{publicacion.descripcion}</Text>
        <Text style={styles.precio}>${publicacion.precio}</Text>
        <Button
          title={"Comprar"}
          onPress={comprar}
          containerStyle={styles.buttonComprar}
        />
      </View>
    </ScrollView>
  );
}
