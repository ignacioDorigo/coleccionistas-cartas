import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Alert } from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import { styles } from "./MisPublicacionesScreen.styles";
import axios from "axios";
import { ipHost } from "../../../utils/ipHost";
import { TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";

export function MisPublicacionesScreen() {
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;
  const [publicaciones, setPublicaciones] = useState([]);
  const [imagenesPublicacion, setImagenesPublicacion] = useState({});
  const [indiceImagenActual, setIndiceImagenActual] = useState({});
  const [recargar, setRecargar] = useState(false);

  const repintarScreen = () => {
    setRecargar((prevState) => !prevState);
  };

  useEffect(() => {
    buscarPublicaciones();
  }, [recargar]);

  const buscarPublicaciones = async () => {
    try {
      const response = await axios.get(
        `http://${ipHost}:8080/coleccionistas/misPublicaciones?mail=${mail}`
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

  const eliminarPublicacion = async (idPublicacion) => {
    try {
      const response = await axios.delete(
        `http://${ipHost}:8080/coleccionistas/eliminarPublicacion?mail=${mail}&idPublicacion=${idPublicacion}`
      );
      Alert.alert("Exito", response.data);
      repintarScreen();
    } catch (error) {
      Alert.alert("Error", error.response.data);
    }
  };

  const editarPublicacion = async (idPublicacion) => {
    try {
      console.log("PUBLICACION A EDITAR: " + idPublicacion);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {publicaciones.length === 0 ? (
        <Text>No hay publicaciones</Text>
      ) : (
        publicaciones.map((publicacion, index) => (
          <View key={index} style={styles.publicacionContainer}>
            <Text style={styles.publicacionText}>
              Titulo: {publicacion.titulo}
            </Text>
            <Text style={styles.publicacionDetail}>
              Descripcion: {publicacion.descripcion}
            </Text>
            <Text style={styles.priceText}>Precio: ${publicacion.precio}</Text>
            <Text style={styles.estadoText}>Estado: {publicacion.estado}</Text>


            <Icon
              type="material-community"
              name="close-circle"
              color={"#FF0000"}
              containerStyle={styles.iconCancel}
              size={30}
              onPress={() => eliminarPublicacion(publicacion.id)}
            ></Icon>

            {/* Par el carrousel de las imgssss */}
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
          </View>
        ))
      )}
    </ScrollView>
  );
}
