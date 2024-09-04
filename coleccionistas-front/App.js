import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Login';
import Register from './Register';
import Home from "./Home";

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen component={Login} name='Login'></Stack.Screen>
        <Stack.Screen component={Register} name='Register'></Stack.Screen>
        <Stack.Screen component={Home} name='Home'></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}