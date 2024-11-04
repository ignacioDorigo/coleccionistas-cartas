import { useFormik } from "formik";
import React, { useContext } from "react";
import { View, Text, Alert } from "react-native";
import { initialValues, validationSchema } from "./ActualizarPrecioForm.data";
import { styles } from "./ActualizarPrecioForm.styles";
import { Button, Icon, Input, Overlay } from "@rneui/themed";
import { ipHost } from "../../../utils/ipHost";
import axios from "axios";
import { RecargarContext } from "../../../context/RecargarContext";

export function ActualizarPrecioForm(props) {
  const { recargarMarketplace } = useContext(RecargarContext);

  const { visible, ocultarModal, mail, publicacion, repintarMisPublicaciones } =
    props;

  const formik = useFormik({
    initialValues: initialValues(),
    validateOnChange: false,
    validationSchema: validationSchema(),
    onSubmit: async (formulario) => {
      try {
        const response = await axios.put(
          `http://${ipHost}:8080/coleccionistas/publicacion/actualizarPrecio?mail=${mail}&idPublicacion=${publicacion.id}&precio=${formulario.precio}`
        );
        Alert.alert("Exito", response.data);
        repintarMisPublicaciones();
        recargarMarketplace();
      } catch (error) {
        console.log(error);
      } finally {
        ocultarModal();
      }
    },
  });

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={ocultarModal}
      overlayStyle={styles.overlay}
    >
      <Text style={styles.titulo}>Cambio de Precio</Text>
      <Input
        placeholder="Ingrese el nuevo precio"
        errorMessage={formik.errors.precio}
        keyboardType="numeric"
        onChangeText={(texto) => formik.setFieldValue("precio", texto)}
        rightIcon={
          <Icon
            type="material-community"
            name="pencil-outline"
            color="#C1C1C1"
          ></Icon>
        }
      />

      <Button
        title="Confirmar"
        onPress={formik.handleSubmit}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnConfirmar}
      />
    </Overlay>
  );
}
