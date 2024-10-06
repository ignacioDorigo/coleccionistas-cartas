import { Overlay } from "@rneui/themed";
import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { styles } from "./ModalCarga.styles";

export function ModalCarga(props) {
  const { isVisible, texto } = props;

  return (
    <Overlay isVisible={isVisible}>
      <View style={styles.container}>
        <ActivityIndicator style={styles.containerActivity} color={"#8D31D8"} size={"large"}></ActivityIndicator>
        {/* <Text style={styles.containerText}>{texto || ""}</Text> */}
      </View>
    </Overlay>
  );
}
