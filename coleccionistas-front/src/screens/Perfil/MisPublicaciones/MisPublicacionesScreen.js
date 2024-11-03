import React, { useContext } from "react";
import { View, Text } from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import { styles } from "./MisPublicacionesScreen.styles";

export function MisPublicacionesScreen() {
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;
  console.log(mail);
  return (
    <View>
      <Text>MisPublicacionesScreen</Text>
    </View>
  );
}
