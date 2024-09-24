import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function AddCollection({ route, navigation }) {
    // Mail de prueba que despues hay que ver como lo pasamos, ya sea por params o por el context
    const { mail } = route.params;
    // console.log(mail);

    // Estos son las colecciones que puede elegir el user, Fer y Lukitas
    const [colecciones, setColecciones] = useState([]);

    const ViajarColeccion = (coleccion) => {
        if (coleccion.nombre === 'Pokemon') {
            navigation.navigate('ElegirSetPokemon', { coleccion: coleccion, mail: mail });
        }
    }

    useEffect(() => {
        axios.get(`http://192.168.0.108:8080/coleccionistas/coleccionesDisponibles`)
            .then((respuestaBack) => { setColecciones(respuestaBack.data) })
            .catch((error) => { console.log(error) })
    }, []);

    return (
        <ScrollView style={style.container}>
            <Text>Elegí Tu Nueva Coleccion</Text>

            {colecciones.map((coleccion, index) => (
                <TouchableOpacity key={index} onPress={() => ViajarColeccion(coleccion)}>
                    <Image style={style.imagen} source={{ uri: `${coleccion.imagen}` }}></Image>
                </TouchableOpacity>
            ))
            }

        </ScrollView >
    )
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
    }
    ,
})