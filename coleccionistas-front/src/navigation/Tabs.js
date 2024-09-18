import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import HomeStack from './HomeStack';
import Wishlist from 'screens/WishlistScreen/WishlistScreen';
import Marketplace from 'screens/MarketplaceScreen/MarketplaceScreen';
import SettingsScreen from 'screens/SettingsScreen/SettingsScreen';

const Tab = createBottomTabNavigator();

function iconoTab(route, color, size) {
    let nombreIcono;
    if (route.name === 'Home') {
        nombreIcono = 'cards-outline';
    }
    if (route.name === 'Settings') {
        nombreIcono = 'account';
    }
    if (route.name === 'Favorites') {
        nombreIcono = 'heart-outline';
    }
    if (route.name === 'Marketplace') {
        nombreIcono = 'shopping';
    }
    return (<Icon name={nombreIcono} type='material-community' color={color} size={size}></Icon>);
}

export default function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarInactiveTintColor: '#363636',
                tabBarActiveTintColor: '#C26DBB',
                tabBarIcon: ({ color, size }) => iconoTab(route, color, size),
            })}
        >
            <Tab.Screen name="Home" component={HomeStack} options={{ title: 'Colecciones' }} />
            <Tab.Screen name="Favorites" component={Wishlist} options={{ title: 'Favoritos' }} />
            <Tab.Screen name="Marketplace" component={Marketplace} options={{ title: 'Marketplace' }} />
            <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Perfil' }} />
        </Tab.Navigator>
    );
}