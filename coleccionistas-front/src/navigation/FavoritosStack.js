import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { View, Text } from 'react-native'

// Fichero Screen
import { screen } from '../utils'

// Screens relacionadas a Favoritos
import { FavoritosScreen } from '../screens/Favoritos/FavoritosScreen'


export function FavoritosStack() {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name={screen.favoritos.favoritos} component={FavoritosScreen} />
    </Stack.Navigator>
  )
}