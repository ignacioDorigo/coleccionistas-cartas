import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import { styles } from "./MisComprasScreen.styles";
import axios from "axios";
import { ipHost } from "../../../utils/ipHost";

export function MisComprasScreen() {
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;
  console.log(mail);

  const [imagenesPublicacion, setImagenesPublicacion] = useState({});
  const [indiceImagenActual, setIndiceImagenActual] = useState({});
  const [misCompras, setMisCompras] = useState([]);

  useEffect(() => {
    buscarMisCompras();
  }, []);

  const buscarMisCompras = async () => {
    try {
      const response = await axios.get(
        `http://${ipHost}:8080/coleccionistas/misCompras?mail=${mail}`
      );
      const objetos = response.data;
      const soloIds = objetos.map((objeto) => objeto.idPublicacion);

      const publicacionesCompra = [];
      for (let index = 0; index < soloIds.length; index++) {
        const element = soloIds[index];
        const response2 = await axios.get(
          `http://${ipHost}:8080/coleccionistas/buscarPublicacion?idPublicacion=${element}`
        );
        publicacionesCompra.push(response2.data);
      }
      publicacionesCompra.forEach((publicacion) => {
        obtenerImagenes(publicacion.id);
      });
      setMisCompras(publicacionesCompra);
    } catch (error) {
      console.error("Error al buscar compras:", error);
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
      console.error(
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

  return (
    <View style={styles.container}>
      {misCompras.length === 0 ? (
        <View style={styles.viewSinCompra}>
          <Text style={styles.sinCompras}>Aún no tenés compras</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.publicaciones}>
          {misCompras.map((compra, index) => (
            <View key={index} style={styles.publicacionContainer}>
              <Text style={styles.publicacionText}>{compra.titulo}</Text>
              <Text style={styles.publicacionDetail}>{compra.descripcion}</Text>
              <Text style={styles.vendedorText}>
                Contactar vendedor:{" "}
                <Text
                  style={styles.publicacionEmail}
                  onPress={() =>
                    Linking.openURL(
                      `googlegmail://co?to=${compra.mail}&subject=Coordinar Compra&body=Hola buenas tardes quisiera coordinar para la entrega de ${compra.titulo} !`
                    )
                  }
                >
                  {compra.mail}
                </Text>
              </Text>

              <Text style={styles.priceText}>${compra.precio}</Text>
              {imagenesPublicacion[compra.id]?.length ? (
                <View style={styles.carouselContainer}>
                  <TouchableOpacity
                    onPress={() => cambiarImagen(compra.id, -1)}
                  >
                    <Text style={styles.arrow}>{"<"}</Text>
                  </TouchableOpacity>

                  <Image
                    source={{
                      uri: `data:image/jpeg;base64,${
                        imagenesPublicacion[compra.id][
                          indiceImagenActual[compra.id]
                        ]
                      }`,
                    }}
                    style={styles.carouselImage}
                  />

                  <TouchableOpacity onPress={() => cambiarImagen(compra.id, 1)}>
                    <Text style={styles.arrow}>{">"}</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={styles.noImagesText}>No hay imágenes</Text>
              )}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
