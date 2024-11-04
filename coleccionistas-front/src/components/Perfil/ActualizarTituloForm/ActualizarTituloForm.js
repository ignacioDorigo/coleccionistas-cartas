import React from "react";
import { View, Text } from "react-native";
import { Overlay, Input, Icon, Button } from "@rneui/themed";
import { styles } from "./ActualizarTituloForm.styles";

export function ActualizarTituloForm(props) {
  const { visible } = props;
  
  return (
    <Overlay isVisible={visible}>
      <Text>ActualizarTituloForm</Text>
      <Input placeholder="Ingrese nuevo titulo" />
      <Button title={"Actualizar"} />
    </Overlay>
  );
}
