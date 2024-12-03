import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, Text } from "react-native";

// Fichero Screen
import { screen } from "../utils";

// Screens relacionadas a Perfil
import { PerfilScreen } from "../screens/Perfil/PerfilScreen";
import { MisPublicacionesScreen } from "../screens/Perfil/MisPublicaciones";
import { MisComprasScreen } from "../screens/Perfil/MisCompras/MisComprasScreen";
import { MisVentasScreen } from "../screens/Perfil/MisVentas/MisVentasScreen";

export function PerfilStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name={screen.perfil.perfil} component={PerfilScreen} />
      <Stack.Screen
        name={screen.perfil.misPublicaciones}
        component={MisPublicacionesScreen}
        options={{ title: "Mis Publicaciones" }}
      />
      <Stack.Screen
        name={screen.perfil.misCompras}
        component={MisComprasScreen}
        options={{ title: "Mis Compras" }}
      />
      <Stack.Screen
        name={screen.perfil.misVentas}
        component={MisVentasScreen}
        options={{ title: "Mis Ventas" }}
      />
    </Stack.Navigator>
  );
}
