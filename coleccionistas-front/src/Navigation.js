import React, { useContext } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext, AuthProvider } from './context/AuthContext';
import { Icon } from '@rneui/themed';

// screens
import HomeScreen from 'screens/HomeScreen/HomeScreen';
import SettingsScreen from 'screens/SettingsScreen/SettingsScreen';
import ListScreen from 'screens/ListScreen/ListScreen';
import ItemDetailScreen from 'screens/ItemDetailScreen/ItemDetailScreen';
import LoginScreen from 'screens/LoginScreen/LoginScreen';
import RegisterScreen from 'screens/RegisterScreen/RegisterScreen';
import Wishlist from 'screens/Wishlist/Wishlist';
import Marketplace from 'screens/Marketplace/Marketplace';

const Tab = createBottomTabNavigator();
const HomeStackNavigator = createNativeStackNavigator();
const AuthStackNavigator = createNativeStackNavigator();

function AuthStack() {
    return (
        // screenOptions={{headerShown:false}}
        <AuthStackNavigator.Navigator initialRouteName="Login" >
            <AuthStackNavigator.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
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
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarInactiveTintColor: '#363636',
            tabBarActiveTintColor: '#C26DBB',
            tabBarIcon: ({ color, size }) => iconoTab(route, color, size)
        })}>
            <Tab.Screen name="Home" component={HomeStack} options={{ title: 'Colecciones' }} />
            <Tab.Screen name="Favorites" component={Wishlist} options={{ title: 'Favoritos' }} />
            <Tab.Screen name="Marketplace" component={Marketplace} options={{ title: 'Marketplace' }} />
            <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Perfil' }} />
        </Tab.Navigator>
    );
}

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
    return (<Icon name={nombreIcono} type='material-community' color={color} size={size}></Icon>)
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