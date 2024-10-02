import React, { useContext } from "react";
import { View, Text, Alert } from "react-native";
import { Overlay, Input, Button, Icon } from "@rneui/themed";
import { styles } from "./CambiarNombreForm.styles";
import { AuthContext } from "../../../context/AuthContext";
import { initialValues, validationSchema } from "./CambiarNombreForm.data";
import axios from "axios";
import { useFormik } from "formik";

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
          `http://192.168.1.5:8080/coleccionistas/actualizarNombre?mail=${mail}&nuevoNombre=${formulario.nombre}`
        )
        .then((response) => {
          Alert.alert("Exito", response.data);
          ocultarModal();
          repintarComponentes();
        })
        .catch((error) => console.log(error));
    },
  });

  const cancelar = () => {
    ocultarModal();
  };

  return (
    <Overlay isVisible={visible} overlayStyle={styles.overlay} onBackdropPress={ocultarModal}>
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
      <View style={styles.contenedorBotones}>
        <Button
          title="Cancelar"
          onPress={cancelar}
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btnCancelar}
        />
        <Button
          title="Confirmar"
          onPress={formik.handleSubmit}
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btnConfirmar}
        />
      </View>
    </Overlay>
  );
}
