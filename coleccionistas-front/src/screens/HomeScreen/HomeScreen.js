import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useTheme } from 'context/ThemeContext';
import { lightTheme, darkTheme } from 'constants/themes';
import createStyles from 'screens/HomeScreen/HomeScreen.styles';

import { Icon } from '@rneui/themed';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
    // Mail de prueba que despues hay que ver como lo pasamos, ya sea por params o por el context
    const mail = 'a';

    const { isDarkTheme } = useTheme();
    const theme = isDarkTheme ? darkTheme : lightTheme;
    const styles = createStyles(theme);


    // Esto tambien es nuevo...
    const [misColecciones, setMisColecciones] = useState([]);

    useEffect(() => {
        axios.get(`http://192.168.0.108:8080/coleccionistas/misColecciones?mail=${mail}`)
            .then(respuestaBack => setMisColecciones(respuestaBack.data))
            .catch(error => console.log(error))
    }, [misColecciones]);

    const irAScreenColeccion = (nombre) => {
        let nombreScreen;
        console.log("El valor de nombre es: ", nombre);
        if (nombre === 'Pokemon') {
            nombreScreen = 'MisSetsPokemon';
        }
        navigation.navigate(nombreScreen, { mail: mail });
    }

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
                    <View>
                        <Text>Aca tenes tu colecciones crack</Text>
                        {misColecciones.map((coleccion, index) => (
                            <TouchableOpacity key={index} onPress={() => irAScreenColeccion(coleccion.nombre)}>
                                <Image style={style.imagen} source={{ uri: `${coleccion.imagen}` }}></Image>
                            </TouchableOpacity>
                        ))
                        }
                    </View>
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
const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    imagen: {
        width: '100%',
        height: 120,
        marginBottom: 10,
        resizeMode: 'contain',
    }
    ,
})