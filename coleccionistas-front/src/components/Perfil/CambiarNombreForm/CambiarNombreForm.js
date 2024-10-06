import React, { useContext } from "react";
import { View, Text, Alert } from "react-native";
import { Overlay, Input, Button, Icon } from "@rneui/themed";
import { styles } from "./CambiarNombreForm.styles";
import { AuthContext } from "../../../context/AuthContext";
import { initialValues, validationSchema } from "./CambiarNombreForm.data";
import axios from "axios";
import { useFormik } from "formik";
import Toast from "react-native-toast-message";

export function CambiarNombreForm(props) {
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;
  const { visible, ocultarModal, repintarComponentes } = props;

  const formik = useFormik({
    initialValues: initialValues(),
    validateOnChange: false,
    validationSchema: validationSchema(),
    onSubmit: (formulario) => {
      axios
        .put(
          `http://192.168.1.14:8080/coleccionistas/actualizarNombre?mail=${mail}&nuevoNombre=${formulario.nombre}`
        )
        .then((response) => {
          Toast.show({
            type: "success",
            position: "bottom",
            text1: "Exito",
            text2: response.data,
          });
          ocultarModal();
          repintarComponentes();
        })
        .catch((error) => {
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Error",
            text2: error.response.data,
          });
          ocultarModal();
        });
    },
  });

  const cancelar = () => {
    ocultarModal();
  };

  return (
    <Overlay
      isVisible={visible}
      overlayStyle={styles.overlay}
      onBackdropPress={ocultarModal}
    >
      <Text style={styles.titulo}>Cambio de Nombre</Text>
      <Input
        placeholder="Ingrese su nombre"
        errorMessage={formik.errors.nombre}
        onChangeText={(texto) => formik.setFieldValue("nombre", texto)}
        rightIcon={
          <Icon
            type="material-community"
            name="account-outline"
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
