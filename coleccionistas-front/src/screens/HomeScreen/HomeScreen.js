import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { useTheme } from 'context/ThemeContext';
import { lightTheme, darkTheme } from 'constants/themes';
import createStyles from 'screens/HomeScreen/HomeScreen.styles';

import { Icon } from '@rneui/themed';

export default function HomeScreen({ navigation }) {
    // Mail de prueba que despues hay que ver como lo pasamos, ya sea por params o por el context
    const mail = 'nacho@gmail.com';
    const { isDarkTheme } = useTheme();
    const theme = isDarkTheme ? darkTheme : lightTheme;
    const styles = createStyles(theme);


    // Esto tambien es nuevo...
    const [misColecciones, setMisColecciones] = useState([]);

    return (
        <>

            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.header__text}>Mis Colecciones</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate("CrearColeccion", { mail: mail }) }}>
                        <Icon type='material-community' name='book-plus-multiple' style={styles.header__icon} color={theme.primary}></Icon>
                    </TouchableOpacity>
                </View>

                {misColecciones.length === 0 ?
                    <Text>No tenes colecciones todavia</Text> :
                    <Text>Aca tenes tu colecciones crack</Text>
                }

                {/* <TouchableOpacity
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
                </TouchableOpacity> */}
            </View>
        </>
    );
}
