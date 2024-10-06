import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import axios from 'axios';

// Fichero Screen
import { screen } from '../../../utils'

export function AddCollection({ navigation }) {

    const [colecciones, setColecciones] = useState([]);

    const ViajarColeccion = (coleccion) => {
        if (coleccion.nombre === 'Pokemon') {
            navigation.navigate(screen.coleccion.elegirSetPokemon, { coleccion: coleccion });
        }
    }

    useEffect(() => {
        axios.get(`http://192.168.1.14:8080/coleccionistas/coleccionesDisponibles`)
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