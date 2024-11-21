import axios from "axios";
import { Button } from "@rneui/themed";
import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { ipHost } from "../../../utils";
import { styles } from "./DetallePublicacion.styles";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../context/AuthContext";
import { screen } from "../../../utils";
import { RecargarContext } from "../../../context/RecargarContext";
import { mpIntegration } from "../../../utils/MpIntegration";

export function DetallePublicacion({ route }) {
  const [imagenesPublicacion, setImagenesPublicacion] = useState({});
  const [indiceImagenActual, setIndiceImagenActual] = useState({});
  const [imagenAmpliada, setImagenAmpliada] = useState(null); // Estado para la imagen ampliada
  const [fiabilidad, setFiabilidad] = useState(""); // Estado para la fiabilidad de la carta
  const { isLoggedIn, logout } = useContext(AuthContext);
  const mail = isLoggedIn;
  const navigation = useNavigation();
  const { recargarMarketplace } = useContext(RecargarContext);

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
        [idPublicacion]: response.data || [],
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

  const verificarFiabilidad = async () => {
    try {
      const imageUrl = `http://${ipHost}:8080/coleccionistas/imagenes/${publicacion.id}`;
      const response = await axios.post(
        `http://${ipHost}:8080/coleccionistas/obtenerFiabilidadDeTarjeta`,
        null,
        {
          params: { imageUrl: imageUrl },
        }
      );
      setFiabilidad(response.data);
      Alert.alert("Resultado de Fiabilidad", response.data);
    } catch (error) {
      console.log("Error al verificar la fiabilidad de la carta:", error);
      Alert.alert("Error", "No se pudo verificar la fiabilidad de la carta.");
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

  const confirmarComprarCarta = () => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de que deseas comprar esta carta?",
      [
        {
          text: "Cancelar",
          style: "destructive",
        },
        {
          text: "Comprar",
          style: "default",
          onPress: () => validarCompra(),
        },
      ],
      { cancelable: true }
    );
  };

  const validarCompra = async () => { 

    const result = await mpIntegration(publicacion);

    if (result === "success") {
      eliminarPublicacion(publicacion.mail, publicacion.id);
    } else if (result === "cancel") {
      Alert.alert(
        "Compra Cancelada", // Título del alerta
        "Intenta nuevamente.", // Mensaje adicional
        [
          {
            text: "Ok",
            style: "default",
          }
        ]
      );
    } else {
      console.log("Error", "No se pudo completar la compra.");
    }

  };

  const eliminarPublicacion = async (mail, idPublicacion) => {
    try {
      const response = await axios.delete(
        `http://${ipHost}:8080/coleccionistas/eliminarPublicacion?mail=${mail}&idPublicacion=${idPublicacion}`
      );
      recargarMarketplace();
      navigation.navigate(screen.marketplace.marketplace);
      navigation.navigate(screen.perfil.misCompras);
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data || "Error al eliminar la publicación"
      );
    }
  };

  const mostrarImagenAmpliada = (imagen) => {
    setImagenAmpliada(imagen);
  };

  const cerrarImagenAmpliada = () => {
    setImagenAmpliada(null);
  };

  return (
    <ScrollView>
      {imagenesPublicacion[publicacion.id] &&
      imagenesPublicacion[publicacion.id].length ? (
        <View style={styles.carouselContainer}>
          <TouchableOpacity
            onPress={() =>
              mostrarImagenAmpliada(
                imagenesPublicacion[publicacion.id][
                  indiceImagenActual[publicacion.id]
                ]
              )
            }
          >
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
          </TouchableOpacity>

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
          onPress={confirmarComprarCarta}
          containerStyle={styles.buttonComprar}
        />
        {/* <Button
          title={"Verificar Fiabilidad"}
          onPress={verificarFiabilidad}
          containerStyle={styles.buttonVerificar}
        />
        {fiabilidad && (
          <Text style={styles.resultadoFiabilidad}>{fiabilidad}</Text>
        )} */}
      </View>

      {/* Modal para imagen ampliada */}
      <Modal
        visible={imagenAmpliada !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={cerrarImagenAmpliada}
      >
        <TouchableWithoutFeedback onPress={cerrarImagenAmpliada}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <Image
                source={{
                  uri: `data:image/jpeg;base64,${imagenAmpliada}`,
                }}
                style={styles.imagenAmpliada}
              />
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
  );
}
