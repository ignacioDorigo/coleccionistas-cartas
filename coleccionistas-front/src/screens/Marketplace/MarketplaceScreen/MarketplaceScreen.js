import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import styles from "./MarketPlaceScreen.styles";
import { Icon } from "@rneui/themed";

export function MarketPlaceScreen() {
  const [buscador, setBuscador] = useState("");

  const buscarCartas = () => {
    console.log("BUSCANDO LA CARTA ", buscador);
    // Aca ejecutamos el endpoint
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          placeholder="Buscar....."
          style={styles.input}
          autoCapitalize="none"
          onChangeText={(dato) => setBuscador(dato)}
        ></TextInput>
        <TouchableOpacity>
          <Icon
            type="material-community"
            name="magnify"
            iconStyle={styles.icon}
            onPress={buscarCartas}
          />
        </TouchableOpacity>
      </View>
      <Text>Estas buscando: {buscador}</Text>
    </View>
  );
}
