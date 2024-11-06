import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Alert } from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import { styles } from "./MisPublicacionesScreen.styles";
import axios from "axios";
import { ipHost } from "../../../utils/ipHost";
import { TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import { ActualizarTituloForm } from "../../../components/Perfil/ActualizarTituloForm/ActualizarTituloForm";
import { ActualizarDescripcionForm } from "../../../components/Perfil/ActualizarDescripcionForm/ActualizarDescripcionForm";
import { ActualizarPrecioForm } from "../../../components/Perfil/ActualizarPrecioForm/ActualizarPrecioForm";
import { RecargarContext } from "../../../context/RecargarContext";

export function MisPublicacionesScreen() {
  const { isLoggedIn } = useContext(AuthContext);
  const { recargarMarketplace } = useContext(RecargarContext);
  const mail = isLoggedIn;
  const [publicaciones, setPublicaciones] = useState([]);
  const [imagenesPublicacion, setImagenesPublicacion] = useState({});
  const [indiceImagenActual, setIndiceImagenActual] = useState({});
  const [recargar, setRecargar] = useState(false);

  const [visibleTitulo, setVisibleTitulo] = useState(false);
  const [visibleDescripcion, setVisibleDescripcion] = useState(false);
  const [visiblePrecio, setVisiblePrecio] = useState(false);
  const [publicacionClickeada, setPublicacionClickeada] = useState(null);

  const ocultarModalTitulo = () => {
    setVisibleTitulo((prevState) => !prevState);
  };
  const ocultarModalDescripcion = () => {
    setVisibleDescripcion((prevState) => !prevState);
  };
  const ocultarModalPrecio = () => {
    setVisiblePrecio((prevState) => !prevState);
  };
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

  const confirmarEliminarPublicacion = (idPublicacion) => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de que deseas eliminar esta publicación?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => eliminarPublicacion(idPublicacion)
        }
      ],
      { cancelable: true }
    );
  };

  const eliminarPublicacion = async (idPublicacion) => {
    try {
      const response = await axios.delete(
        `http://${ipHost}:8080/coleccionistas/eliminarPublicacion?mail=${mail}&idPublicacion=${idPublicacion}`
      );
      Alert.alert("Éxito", response.data);
      repintarScreen();
      recargarMarketplace();
    } catch (error) {
      Alert.alert("Error", error.response?.data || "Error al eliminar la publicación");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {publicaciones.length === 0 ? (
        <Text>No hay publicaciones</Text>
      ) : (
        publicaciones.map((publicacion, index) => (
          <View key={index} style={styles.publicacionContainer}>
            <View style={styles.titleIcon}>
              <Text style={styles.publicacionText}>
                Titulo: {publicacion.titulo}
              </Text>
              <Icon
                type="material-community"
                name="pencil-outline"
                color={"#000"}
                size={20}
                onPress={() => {
                  setPublicacionClickeada(publicacion);
                  ocultarModalTitulo();
                }}
              ></Icon>
            </View>

            <View style={styles.titleIcon}>
              <Text style={styles.publicacionDetail}>
                Descripcion: {publicacion.descripcion}
              </Text>
              <Icon
                type="material-community"
                name="pencil-outline"
                color={"#C1C1C1"}
                size={20}
                onPress={() => {
                  setPublicacionClickeada(publicacion);
                  ocultarModalDescripcion();
                }}
              ></Icon>
            </View>

            <View style={styles.titleIcon}>
              <Text style={styles.priceText}>
                Precio: ${publicacion.precio}
              </Text>
              <Icon
                type="material-community"
                name="pencil-outline"
                color={"#4CAF50"}
                size={20}
                onPress={() => {
                  setPublicacionClickeada(publicacion);
                  ocultarModalPrecio();
                }}
              ></Icon>
            </View>
            <Text style={styles.estadoText}>Estado: {publicacion.estado}</Text>

            <Icon
              type="material-community"
              name="close-circle"
              color={"#FF0000"}
              containerStyle={styles.iconCancel}
              size={30}
              onPress={() => confirmarEliminarPublicacion(publicacion.id)}
            ></Icon>

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
      <ActualizarTituloForm
        visible={visibleTitulo}
        ocultarModal={ocultarModalTitulo}
        mail={mail}
        publicacion={publicacionClickeada}
        repintarMisPublicaciones={repintarScreen}
      />

      <ActualizarDescripcionForm
        visible={visibleDescripcion}
        ocultarModal={ocultarModalDescripcion}
        mail={mail}
        publicacion={publicacionClickeada}
        repintarMisPublicaciones={repintarScreen}
      />
      <ActualizarPrecioForm
        visible={visiblePrecio}
        ocultarModal={ocultarModalPrecio}
        mail={mail}
        publicacion={publicacionClickeada}
        repintarMisPublicaciones={repintarScreen}
      />
    </ScrollView>
  );
}
