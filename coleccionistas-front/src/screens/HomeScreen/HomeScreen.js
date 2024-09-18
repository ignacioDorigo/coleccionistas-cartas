import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { useTheme } from 'context/ThemeContext';
import { lightTheme, darkTheme } from 'constants/themes';
import createStyles from 'screens/HomeScreen/HomeScreen.styles';

export default function HomeScreen({ navigation }) {
    const { isDarkTheme } = useTheme();
    const theme = isDarkTheme ? darkTheme : lightTheme;
    const styles = createStyles(theme);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bienvenidos</Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('Pokemon')}
            >
                <Text style={styles.pr}>Pokemon</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('YuGiOh')}
            >
                <Text style={styles.buttonText}>Yu-Gi-Oh!</Text>
            </TouchableOpacity>
        </View>
    );
}
