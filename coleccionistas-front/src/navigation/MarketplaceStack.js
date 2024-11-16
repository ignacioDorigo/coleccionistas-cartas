import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, Text } from "react-native";

// Fichero Screen
import { screen } from "../utils";

// Screens relacionadas a Marketplace
import { MarketPlaceScreen } from "../screens/Marketplace";
import { DetallePublicacion } from "../screens/Marketplace";

export function MarketplaceStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.marketplace.marketplace}
        component={MarketPlaceScreen}
      />
      <Stack.Screen
        name={screen.marketplace.detallePublicacion}
        component={DetallePublicacion}
        options={{title:"Publicacion"}}
      />
    </Stack.Navigator>
  );
}
