import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

// Fichero screens
import { screen } from "../../../utils";
import { styles } from "./MarketPlaceScreen.styles";

export function MarketPlaceScreen() {
  const navigation = useNavigation();

  const goToComprarScreen = () => {
    navigation.navigate(screen.marketplace.comprar);
  };

  const goToVenderScreen = () => {
    navigation.navigate(screen.marketplace.vender);
  };

  const goToBuscarInformacion = () => {
    navigation.navigate(screen.marketplace.buscarInformación);
  };

  return (
    <View style={styles.container}>
      {/* Aca vo ya poner el logo */}
      <Image source={require(`../../../assets/icon.png`)} style={styles.logo}/>

      <Text style={styles.titulo}>Bienvenido al MarketPlace de Findex</Text>
      <Text style={styles.subtitulo}>Selecciona el tipo de Operación para continuar</Text>

      <Button
        title={"Comprar Cartas"}
        onPress={goToComprarScreen}
        containerStyle={styles.btnContainer}
        titleStyle={styles.title}
      />
      <Button
        title={"Vender Cartas"}
        onPress={goToVenderScreen}
        containerStyle={styles.btnContainer}
        titleStyle={styles.title}
      />
      <Button
        title={"Buscar Información Carta"}
        onPress={goToBuscarInformacion}
        containerStyle={styles.btnContainer}
        titleStyle={styles.title}
      />
    </View>
  );
}
