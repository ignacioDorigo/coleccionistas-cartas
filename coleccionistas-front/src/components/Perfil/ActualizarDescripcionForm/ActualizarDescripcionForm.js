import { Button, Icon, Input, Overlay } from "@rneui/themed";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { View, Text, Alert } from "react-native";
import {
  initialValues,
  validationSchema,
} from "./ActualizarDescripcionForm.data";
import { styles } from "./ActualizarDescripcionForm.styles";
import axios from "axios";
import { ipHost } from "../../../utils/ipHost";
import { RecargarContext } from "../../../context/RecargarContext";

export function ActualizarDescripcionForm(props) {
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
          `http://${ipHost}:8080/coleccionistas/publicacion/actualizarDescripcion?mail=${mail}&idPublicacion=${publicacion.id}&descripcion=${formulario.descripcion}`
        );
        Alert.alert("Exito", response.data);
        repintarMisPublicaciones();
        recargarMarketplace();
      } catch (error) {
        Alert.alert("Error", error.response.data);
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
      <Text style={styles.titulo}>Cambio de Descripcion</Text>
      <Input
        placeholder="Ingrese nueva descripcion"
        errorMessage={formik.errors.descripcion}
        onChangeText={(texto) => formik.setFieldValue("descripcion", texto)}
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
