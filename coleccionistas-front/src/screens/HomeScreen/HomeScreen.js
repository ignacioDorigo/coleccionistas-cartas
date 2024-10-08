import { View, Text, Button } from 'react-native';
import React from 'react';
import styles from 'screens/HomeScreen/HomeScreen.styles';

export default function HomeScreen({ navigation }) {
    return (
        <View>
            <Text>Bienvenidos</Text>
            <Button 
                title='Pokemon'
                onPress={() => navigation.navigate('Pokemon')}
            />
            <Button 
                title='Yu-Gi-Oh!'
                onPress={() => navigation.navigate('YuGiOh')}
            />
        </View>
    );
}