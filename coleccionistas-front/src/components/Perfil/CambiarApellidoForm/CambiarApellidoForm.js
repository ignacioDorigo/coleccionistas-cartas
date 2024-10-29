import React, { useContext } from "react";
import { View, Text, Alert } from "react-native";
import { Overlay, Button, Icon, Input } from "@rneui/themed";
import { styles } from "./CambiarApellidoForm.styles";
import { initialValues, validationSchema } from "./CambiarApellidoForm.data";
import { AuthContext } from "../../../context/AuthContext";
import { useFormik } from "formik";
import axios from "axios";
import Toast from "react-native-toast-message";
import { ipHost } from "../../../utils/ipHost";

export function CambiarApellidoForm(props) {
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
          `http://${ipHost}:8080/coleccionistas/actualizarApellido?mail=${mail}&nuevoApellido=${formulario.apellido}`
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
      <Text style={styles.titulo}>Cambio de Apellido</Text>
      <Input
        placeholder="Ingrese su apellido"
        errorMessage={formik.errors.apellido}
        onChangeText={(texto) => formik.setFieldValue("apellido", texto)}
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
