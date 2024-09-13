import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, Button, Alert } from 'react-native';
import axios from 'axios';

export default function YuGiOhApi() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php', {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            setCards(response.data.data); // Actualiza el estado con los datos de las cartas
            setLoading(false); // Cambia el estado de carga
        })
        .catch(error => {
            console.error(error); // Maneja errores
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Cargando cartas...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cartas de Yu-Gi-Oh!</Text>
            <FlatList
                data={cards}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image
                            source={{ uri: item.card_images[0].image_url}}
                            style={styles.image}
                        />
                        <Text style={styles.text}>{item.name}</Text>
                    </View>
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 140,
    },
    text: {
        marginLeft: 10,
        fontSize: 16,
    },
});
