import React, { useContext } from "react";
import { View, Text, Alert } from "react-native";
import { Overlay, Input, Icon, Button } from "@rneui/themed";
import { styles } from "./ActualizarTituloForm.styles";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ActualizarTituloForm.data";
import axios from "axios";
import { ipHost } from "../../../utils/ipHost";
import { RecargarContext } from "../../../context/RecargarContext";

export function ActualizarTituloForm(props) {
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
          `http://${ipHost}:8080/coleccionistas/publicacion/actualizarTitulo?mail=${mail}&idPublicacion=${publicacion.id}&titulo=${formulario.titulo}`
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
      <Text style={styles.titulo}>Cambio de Titulo</Text>
      <Input
        placeholder="Ingrese nuevo titulo"
        errorMessage={formik.errors.titulo}
        onChangeText={(texto) => formik.setFieldValue("titulo", texto)}
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
