import React from "react";
import { View, Text } from "react-native";
import { styles } from "./MisCartasSetYugioh.styles";

export function MisCartasSetYugioh({ route }) {
  //De aca salgo el mail
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;
  console.log(mail);
  // Recibo el set que eligio el user
  const { set } = route.params;
  return (
    <View>
      <Text>MisCartasSetYugioh</Text>
    </View>
  );
}
