import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import { styles } from "./MisComprasScreen.styles";
import axios from "axios";
import { ipHost } from "../../../utils/ipHost";
import { Image } from "@rneui/themed";

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
      // console.log(soloIds);
      const publicacionesCompra = [];
      for (let index = 0; index < soloIds.length; index++) {
        const element = soloIds[index];
        const response2 = await axios.get(
          `http://${ipHost}:8080/coleccionistas/buscarPublicacion?idPublicacion=${element}`
        );
        // console.log(response2.data);
        publicacionesCompra.push(response2.data);
      }
      setMisCompras(publicacionesCompra);
    } catch (error) {}
  };
  return (
    <View>
      {misCompras.length === 0 ? (
        <View style={styles.viewSinCompra}>
          <Text style={styles.sinCompras}>Aún tenes compras</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.publicaciones}>
          {misCompras.map((compra,index) => (
            <TouchableOpacity
              key={index}
              style={styles.publicacionContainer}
              // onPress={() => goToDetalleCard(compra)}
            >
              <Text style={styles.publicacionText}>{compra.titulo}</Text>
              <Text style={styles.publicacionDetail}>{compra.descripcion}</Text>
              <Text style={styles.priceText}>${compra.precio}</Text>

              {/* Carrusel de imágenes */}
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
                <Text>No hay imágenes</Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
