import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ElegirSetPokemon({ route, navigation }) {
    const { coleccion, mail } = route.params;
    const [mazosDisponibles, setMazosDisponibles] = useState([]);

    useEffect(() => {
        axios.get(`https://api.pokemontcg.io/v2/sets/`)
            .then(response => setMazosDisponibles(response.data.data))
            .catch(error => console.log(error));
    }, []);

    const handleMazoPress = (mazo) => {
        Alert.alert(
            "Confirmación",
            "¿Está seguro que quiere crear una colección de este mazo?",
            [
                {
                    text: "CANCELAR",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "ACEPTO",
                    onPress: () => navigation.navigate('CartasSet', { coleccion, mazo, mail })
                }
            ],
            { cancelable: false }
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Text>Elegi que Set de Pokemon queres coleccionar</Text>
            {mazosDisponibles.map((mazo, index) => (
                <TouchableOpacity key={index} style={styles.mazo} onPress={() => handleMazoPress(mazo)}>
                    <Text style={styles.mazo__texto}>ID: {mazo.id}</Text>
                    <Text style={styles.mazo__texto}>{mazo.name}</Text>
                    <Text style={styles.mazo__texto}>{mazo.printedTotal}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    mazo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#240046',
        marginTop: 10,
        marginBottom: 10,
    },
    mazo__texto: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 15,
    }
});
