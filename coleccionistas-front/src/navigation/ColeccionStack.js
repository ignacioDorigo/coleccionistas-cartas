import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { View, Text } from 'react-native'

// Fichero Screen
import { screen } from '../utils'

// Screens relacionadas a Coleccion
import { ColeccionScreen } from '../screens/Coleccion'
import { AddCollection } from '../screens/Coleccion/AddCollection'
import { CartasSet } from '../screens/Coleccion/CartasSet'
import { ElegirSetPokemon } from '../screens/Coleccion/ElegirSetPokemon'
import { MisCartasSet } from '../screens/Coleccion/MisCartasSet'
import { MisSetsPokemon } from '../screens/Coleccion/MisSetsPokemon'

export function ColeccionStack() {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name={screen.coleccion.coleccion} component={ColeccionScreen} />
      <Stack.Screen name={screen.coleccion.addCollection} component={AddCollection} />
      <Stack.Screen name={screen.coleccion.cartasSet} component={CartasSet} />
      <Stack.Screen name={screen.coleccion.elegirSetPokemon} component={ElegirSetPokemon} />
      <Stack.Screen name={screen.coleccion.misCartasSet} component={MisCartasSet} />
      <Stack.Screen name={screen.coleccion.misSetsPokemon} component={MisSetsPokemon} options={{title: "Sets Pokemon"}}/>
    </Stack.Navigator>
  )
}