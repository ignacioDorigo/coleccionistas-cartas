import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { View, Text } from 'react-native'

// Fichero Screen
import { screen } from '../utils'

// Screens relacionadas a Perfil
import { PerfilScreen } from '../screens/Perfil/PerfilScreen'


export function PerfilStack() {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name={screen.perfil.perfil} component={PerfilScreen} />
        </Stack.Navigator>
    )
}