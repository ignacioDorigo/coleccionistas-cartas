import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from 'screens/LoginScreen/LoginScreen';
import RegisterScreen from 'screens/RegisterScreen/RegisterScreen';
import RecuperarPassword from 'screens/RecuperarPasswordScreen/RecuperarPasswordScreen';

const AuthStackNavigator = createNativeStackNavigator();

export default function AuthStack() {
    return (
        <AuthStackNavigator.Navigator initialRouteName="Login">
            <AuthStackNavigator.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <AuthStackNavigator.Screen name="Register" component={RegisterScreen} />
            <AuthStackNavigator.Screen name="Recuperar" component={RecuperarPassword} />
        </AuthStackNavigator.Navigator>
    );
}