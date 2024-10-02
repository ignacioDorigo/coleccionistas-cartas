import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Icon, Button, Overlay, Input } from "@rneui/themed";
import { styles } from "./CambiarPasswordForm.styles";
import { initialValues, validationSchema } from "./CambiarPasswordForm.data";
import { useFormik } from "formik";
import { AuthContext } from "../../../context/AuthContext";

export function CambiarPasswordForm() {
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;

  const formik = useFormik({
    initialValues: initialValues(),
    validateOnChange: false,
    validationSchema: validationSchema(),
    onSubmit: (formulario) => {
      console.log(formulario);
    },
  });

  return (
    <Overlay>
      <Text>CambiarPasswordForm</Text>
      <Input placeholder="Contraseña actual" />
      <Input placeholder="Contraseña nueva" />
      <Input placeholder="Repita la nueva contraseña" />
    </Overlay>
  );
}
