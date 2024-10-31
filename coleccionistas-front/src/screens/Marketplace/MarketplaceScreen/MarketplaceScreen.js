import React, { useState } from "react";
import { View, TextInput, Image, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Fichero screens
import { screen } from "../../../utils";
import { styles } from "./MarketPlaceScreen.styles";
import { Icon, Input } from "@rneui/themed";

export function MarketPlaceScreen() {
  const [publicaciones, setPublicaciones] = useState([]);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Barra de busqueda */}
      <View style={styles.searchBar}>
        <TextInput placeholder="Buscar ...." style={styles.input}></TextInput>
        <Icon
          size={30}
          color={"#FFF"}
          containerStyle={styles.icon}
          type="material-community"
          name="magnify"
        />
      </View>

      {/* Aca van a ir las publicaciones */}
      <ScrollView style={styles.publicaciones}>
        {publicaciones.length === 0 ? (
          <Text>No hay publicaciones</Text>
        ) : (
          <Text>Tus publicaciones aquiii</Text>
        )}
      </ScrollView>
    </View>
  );
}
