import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, Text } from "react-native";

// Fichero Screen
import { screen } from "../utils";

// Screens relacionadas a
import { MarketPlaceScreen } from "../screens/Marketplace";
import { BuscarDetalleCardScreen } from "../screens/Marketplace/BuscarDetalleCardScreen";
import { VenderScreen } from "../screens/Marketplace/VenderScreen";
import { ComprarScreen } from "../screens/Marketplace/ComprarScreen";

export function MarketplaceStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.marketplace.marketplace}
        component={MarketPlaceScreen}
      />
      <Stack.Screen name={screen.marketplace.vender} component={VenderScreen} />
      <Stack.Screen
        name={screen.marketplace.comprar}
        component={ComprarScreen}
      />
      <Stack.Screen
        name={screen.marketplace.buscarInformación}
        component={BuscarDetalleCardScreen}
        options={{ title: "Buscar Información" }}
      />
    </Stack.Navigator>
  );
}
