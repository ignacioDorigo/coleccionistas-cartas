import React, { useContext, useState } from "react";
import { View, Text, Alert } from "react-native";
import { Icon, Button, Overlay, Input } from "@rneui/themed";
import { styles } from "./CambiarPasswordForm.styles";
import { initialValues, validationSchema } from "./CambiarPasswordForm.data";
import { useFormik } from "formik";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

export function CambiarPasswordForm(props) {
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;
  const { visible, ocultarModal, repintarComponentes } = props;

  // ESTO ES PARA LA ACTUAL
  const [mostrarActual, setMostrarActual] = useState(true);
  const mostrarOcultarActual = () => {
    setMostrarActual((prevState) => !prevState);
  };

  // ESTO ES PARA LA NUEVA
  const [mostrarNueva, setMostrarNueva] = useState(true);
  const mostrarOcultarNueva = () => {
    setMostrarNueva((prevState) => !prevState);
  };

  // ESTO ES PARA LA NUEVA REPETIDA
  const [mostrarNuevaRepetida, setMostrarNuevaRepetida] = useState(true);
  const mostrarOcultarNuevaRepetida = () => {
    setMostrarNuevaRepetida((prevState) => !prevState);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validateOnChange: false,
    validationSchema: validationSchema(),
    onSubmit: async (formulario) => {
      try {
        const respuesta = await axios.put(
          `http://192.168.1.5:8080/coleccionistas/actualizarContrasenia?mail=${mail}&actual=${formulario.actual}&nueva=${formulario.nueva}&repetirNueva=${formulario.repetirNueva}`
        );
        Alert.alert("Exito", respuesta.data);
        ocultarModal();
      } catch (error) {
        Alert.alert("Error", error.response.data);
        ocultarModal();
      }
    },
  });

  // const cancelar = () => {
  //   ocultarModal();
  // };

  return (
    <Overlay
      overlayStyle={styles.overlay}
      isVisible={visible}
      onBackdropPress={ocultarModal}
    >
      <Text style={styles.indicacion}>Cambiar contraseña</Text>

      {/* Esto es de la Contraseña ACTUAL */}
      <Input
        placeholder="Contraseña actual"
        autoCapitalize="none"
        secureTextEntry={mostrarActual}
        errorMessage={formik.errors.actual}
        onChangeText={(dato) => formik.setFieldValue("actual", dato)}
        rightIcon={
          <Icon
            type="material-community"
            name={mostrarActual ? "eye-off-outline" : "eye-outline"}
            color="#C1C1C1"
            onPress={mostrarOcultarActual}
          />
        }
      />

      {/* Esto es de la Contraseña NUEVA */}
      <Input
        placeholder="Contraseña nueva"
        autoCapitalize="none"
        secureTextEntry={mostrarNueva}
        errorMessage={formik.errors.nueva}
        onChangeText={(dato) => formik.setFieldValue("nueva", dato)}
        rightIcon={
          <Icon
            type="material-community"
            name={mostrarNueva ? "eye-off-outline" : "eye-outline"}
            color="#C1C1C1"
            onPress={mostrarOcultarNueva}
          />
        }
      />

      {/* Esto es de la Contraseña NUEVAREPETIDA */}
      <Input
        placeholder="Repita Contraseña nueva"
        autoCapitalize="none"
        secureTextEntry={mostrarNuevaRepetida}
        errorMessage={formik.errors.repetirNueva}
        onChangeText={(dato) => formik.setFieldValue("repetirNueva", dato)}
        rightIcon={
          <Icon
            type="material-community"
            name={mostrarNuevaRepetida ? "eye-off-outline" : "eye-outline"}
            color="#C1C1C1"
            onPress={mostrarOcultarNuevaRepetida}
          />
        }
      />

      <View>
        {/* <Button
          title="Cancelar"
          onPress={ocultarModal}
          buttonStyle={styles.btnCancelar}
          containerStyle={styles.btnContainer}
        /> */}
        <Button
          title="Confirmar"
          onPress={formik.handleSubmit}
          buttonStyle={styles.btnConfirmar}
          containerStyle={styles.btnContainer}
          loading={formik.isSubmitting}
        />
      </View>
    </Overlay>
  );
}
