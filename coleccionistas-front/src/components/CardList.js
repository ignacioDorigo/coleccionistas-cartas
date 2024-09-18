// src/components/CardList.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import Card from 'components/Card';

export default function CardList({ apiUrl, extractData, extractImageUrl, title, headers, type }) {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const fetchData = (page) => {
        axios.get(apiUrl(page), { headers })
            .then(response => {
                setCards(extractData(response.data));
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
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
                numColumns={3}
                key={3}
                renderItem={({ item }) => (
                    <Card item={item} extractImageUrl={extractImageUrl} type={type} />
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
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10
    },
});