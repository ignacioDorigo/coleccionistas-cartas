import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Linking,
  TouchableOpacity,
  Image,
} from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import { styles } from "./MisVentasScreen.styles";
import axios from "axios";
import { ipHost } from "../../../utils";

export function MisVentasScreen() {
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;

  const [imagenesPublicacion, setImagenesPublicacion] = useState({});
  const [indiceImagenActual, setIndiceImagenActual] = useState({});
  const [misVentas, setMisVentas] = useState([]);

  useEffect(() => {
    buscarMisVentas();
  }, []);

  const buscarMisVentas = async () => {
    try {
      const response = await axios.get(
        `http://${ipHost}:8080/coleccionistas/misVentas?mail=${mail}`
      );
      const objetos = response.data;
      // console.log(objetos);
      objetos.map((objeto) => {
        // console.log("Mail comprador : " + objeto.mail);
      });
      const idsPublicacionesVentas = objetos.map(
        (venta) => venta.idPublicacion
      );
      // console.log(idsPublicacionesVentas);
      const publicaciones = [];
      for (let index = 0; index < idsPublicacionesVentas.length; index++) {
        const element = idsPublicacionesVentas[index];
        const response2 = await axios.get(
          `http://${ipHost}:8080/coleccionistas/buscarPublicacion?idPublicacion=${element}`
        );
        const public2 = response2.data;
        public2.comprador = objetos[index].mail;

        publicaciones.push(public2);
      }
      publicaciones.forEach((publicacion) => {
        obtenerImagenes(publicacion.id);
      });
      setMisVentas(publicaciones);
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
      {misVentas.length === 0 ? (
        <View style={styles.viewSinCompra}>
          <Text style={styles.sinCompras}>Aún no tenés ventas</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.publicaciones}>
          {misVentas.map((venta, index) => (
            <View key={index} style={styles.publicacionContainer}>
              <Text style={styles.publicacionText}>{venta.titulo}</Text>
              <Text style={styles.publicacionDetail}>{venta.descripcion}</Text>
              <Text style={styles.vendedorText}>
                Contactar comprador:{" "}
                <Text
                  style={styles.publicacionEmail}
                  onPress={() =>
                    Linking.openURL(
                      `googlegmail://co?to=${venta.mail}&subject=Coordinar Compra&body=Buenas y Gracias por comprar ${venta.titulo}. Contactame para coordinar la entrega!`
                    )
                  }
                >{venta.comprador}</Text>
              </Text>

              <Text style={styles.priceText}>${venta.precio}</Text>
              {imagenesPublicacion[venta.id]?.length ? (
                <View style={styles.carouselContainer}>
                  <TouchableOpacity onPress={() => cambiarImagen(venta.id, -1)}>
                    <Text style={styles.arrow}>{"<"}</Text>
                  </TouchableOpacity>

                  <Image
                    source={{
                      uri: `data:image/jpeg;base64,${
                        imagenesPublicacion[venta.id][
                          indiceImagenActual[venta.id]
                        ]
                      }`,
                    }}
                    style={styles.carouselImage}
                  />

                  <TouchableOpacity onPress={() => cambiarImagen(venta.id, 1)}>
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
