import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, Button } from 'react-native';
import axios from 'axios';

export default function CardList({ apiUrl, extractData, extractImageUrl, title, headers }) {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const fetchData = (page) => {
        axios.get(apiUrl(page), { headers })
            .then(response => {
                setCards(extractData(response.data)); // Actualiza el estado con los datos de las cartas
                setLoading(false); // Cambia el estado de carga
            })
            .catch(error => {
                console.error(error); // Maneja errores
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);

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
            <Text style={styles.title}>{title}</Text>
            <FlatList
                data={cards}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image
                            source={{ uri: extractImageUrl(item) }}
                            style={styles.image}
                        />
                        <Text style={styles.text}>{item.name}</Text>
                    </View>
                )}
            />
            {apiUrl(1) !== apiUrl() && (
                <Button 
                    title='Next'
                    onPress={() => setPage(page + 1)}
                />
            )}
            <Text>Page: {page}</Text>
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