// src/components/Card.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Card = ({ item, extractImageUrl, type }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('ItemDetail', { card: item, type })}>
            <View style={styles.card}>
                <Image
                    source={{ uri: extractImageUrl(item) }}
                    style={styles.image}
                />
                <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
                    {item.name}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        alignItems: 'center',
        margin: 10,
    },
    image: {
        width: 100,
        height: 140,
    },
    text: {
        marginTop: 5,
        fontSize: 16,
        textAlign: 'center',
        width: 100,
    },
});

export default Card;