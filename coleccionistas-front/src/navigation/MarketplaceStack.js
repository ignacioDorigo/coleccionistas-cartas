import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { View, Text } from 'react-native'

// Fichero Screen
import { screen } from '../utils'

// Screens relacionadas a 
import { MarketPlaceScreen } from '../screens/Marketplace'

export function MarketplaceStack() {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name={screen.marketplace.marketplace} component={MarketPlaceScreen} />
    </Stack.Navigator>
  )
}