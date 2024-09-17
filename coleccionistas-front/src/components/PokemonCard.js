import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const PokemonCard = ({ card }) => {
    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('/');
        return `${day}/${month}/${year}`;
    };

    return (
        <View style={[styles.container, { width }]}>
            {card.images?.large ? (
                <Image 
                    source={{ uri: card.images.large }} 
                    style={styles.image} 
                />
            ) : (
                <Text>Imagen no disponible</Text>
            )}
            <Text style={styles.title}>{card.name}</Text>
            <Text>Primer Ataque: {card.attacks[0]?.name}</Text>
            <Text>Segundo Ataque: {card.attacks[1]?.name}</Text>
            <Text>Rareza: {card.rarity}</Text>
            <Text>Tipo: {card.set?.name}</Text> 
            <Text>Numero de carta: {card.number}</Text>
            <Text>Serie: {card.set?.series}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'red',
    },
    image: {
        width: 250,
        height: 350,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default PokemonCard;