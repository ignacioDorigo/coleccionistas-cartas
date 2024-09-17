import React, { useContext } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext, AuthProvider } from './context/AuthContext';

// screens
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ListScreen from "./screens/ListScreen";
import ItemDetailScreen from "./screens/ItemDetailScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

const Tab = createBottomTabNavigator();
const HomeStackNavigator = createNativeStackNavigator();
const AuthStackNavigator = createNativeStackNavigator();

function AuthStack() {
    return (
        <AuthStackNavigator.Navigator initialRouteName="Login">
            <AuthStackNavigator.Screen name="Login" component={LoginScreen} />
            <AuthStackNavigator.Screen name="Register" component={RegisterScreen} />
        </AuthStackNavigator.Navigator>
    );
}

function HomeStack() {
    return (
        <HomeStackNavigator.Navigator initialRouteName="HomeScreen">
            <HomeStackNavigator.Screen name="HomeScreen" component={HomeScreen} />
            <HomeStackNavigator.Screen name="Pokemon">
                {(props) => (
                    <ListScreen 
                        {...props}
                        apiUrl={(page) => `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=50`}
                        extractData={(data) => data.data}
                        extractImageUrl={(item) => item.images.small}
                        title="Cartas de Pokémon"
                        headers={{ 'Authorization': `Bearer 76c25664-e901-47bf-a60c-65ca1762d4a6` }}
                        type="Pokemon"
                    />
                )}
            </HomeStackNavigator.Screen>
            <HomeStackNavigator.Screen name="YuGiOh">
                {(props) => (
                    <ListScreen 
                        {...props}
                        apiUrl={() => `https://db.ygoprodeck.com/api/v7/cardinfo.php`}
                        extractData={(data) => data.data}
                        extractImageUrl={(item) => item.card_images[0].image_url}
                        title="Cartas de Yu-Gi-Oh!"
                        type="YuGiOh"
                    />
                )}
            </HomeStackNavigator.Screen>
            <HomeStackNavigator.Screen name="ItemDetail" component={ItemDetailScreen} />
        </HomeStackNavigator.Navigator>
    );
}

function Tabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}

function AppNavigator() {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <NavigationContainer>
            {isLoggedIn ? <Tabs /> : <AuthStack />}
        </NavigationContainer>
    );
}

export default function Navigation() {
    return (
        <AuthProvider>
            <AppNavigator />
        </AuthProvider>
    );
}