import React, { useContext, useEffect } from "react";
import { View, Text } from "react-native";
import { AuthContext } from "../../../context/AuthContext";

export function MisComprasScreen() {
  const { isLoggedIn } = useContext(AuthContext);
  const mail = isLoggedIn;
  console.log(mail);

  useEffect(() => {}, []);
  return (
    <View>
      <Text>MisComprasScreen</Text>
    </View>
  );
}
