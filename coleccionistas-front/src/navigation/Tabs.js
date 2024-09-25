import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';

// Fichero Screen
import { screen } from '../utils'

// Stacks
import { ColeccionStack } from './ColeccionStack'
import { FavoritosStack } from './FavoritosStack'
import { MarketplaceStack } from './MarketplaceStack'
import { PerfilStack } from './PerfilStack'

import { } from '../context/ThemeContext'

const Tab = createBottomTabNavigator();

function iconoTab(route, color, size, focused) {
    let nombreIcono;
    if (route.name === screen.coleccion.coleccionTab) {
        nombreIcono = (focused ? "cards" : "cards-outline")
    }
    if (route.name === screen.perfil.perfilTab) {
        nombreIcono = (focused ? "account" : "account-outline")
    }
    if (route.name === screen.favoritos.favoritosTab) {
        nombreIcono = (focused ? "heart" : "heart-outline")
    }
    if (route.name === screen.marketplace.marketplaceTab) {
        nombreIcono = (focused ? "shopping" : "shopping-outline")
    }
    return (<Icon name={nombreIcono} type='material-community' color={color} size={size}></Icon>);
}

export default function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarInactiveTintColor: '#363636',
                tabBarActiveTintColor: '#8D31D8',
                tabBarIcon: ({ color, size, focused }) => iconoTab(route, color, size, focused),
            })}
        >
            <Tab.Screen name={screen.coleccion.coleccionTab} component={ColeccionStack} options={{ title: 'Colecciones' }} />
            <Tab.Screen name={screen.favoritos.favoritosTab} component={FavoritosStack} options={{ title: 'Favoritos' }} />
            <Tab.Screen name={screen.marketplace.marketplaceTab} component={MarketplaceStack} options={{ title: 'Marketplace' }} />
            <Tab.Screen name={screen.perfil.perfilTab} component={PerfilStack} options={{ title: 'Perfil' }} />
        </Tab.Navigator>
    );
}