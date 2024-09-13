import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, Button, Alert } from 'react-native';
import axios from 'axios';

const API_KEY = '76c25664-e901-47bf-a60c-65ca1762d4a6';

export default function PokeApi() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const nextPage = () => {
        axios.get(`https://api.pokemontcg.io/v2/cards?page=${page + 1}&pageSize=50`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
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
    }

    useEffect(() => {
        axios.get('https://api.pokemontcg.io/v2/cards?page=1&pageSize=50', {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
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
            <Text style={styles.title}>Cartas de Pokémon</Text>
            <FlatList
                data={cards}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image
                            source={{ uri: item.images.small }}
                            style={styles.image}
                        />
                        <Text style={styles.text}>{item.name}</Text>
                    </View>
                )}
            />

            <Button 
                title='Next'
                onPress = {() => {
                if (page < 361) {
                    nextPage() 
                    setPage(page + 1)}}                    
                }
            />
            
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
