import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const YuGiOhCard = ({ card }) => {

    return (
        <View style={[styles.container, { width }]}>
            {card.card_images?.[0]?.image_url ? (
                <Image 
                    source={{ uri: card.card_images[0].image_url }} 
                    style={styles.image} 
                />
            ) : (
                <Text>Imagen no disponible</Text>
            )}
            <Text style={styles.title}>{card.name}</Text>
            <Text>Tipo: {card.type}</Text>
            <Text>Rareza: {card.card_sets?.[0]?.set_rarity} {card.card_sets?.[0]?.set_rarity_code}</Text>
            <Text>Serie: {card.archetype}</Text>
            <Text>Set: {card.card_sets?.[0]?.set_name}</Text>
            <Text>Código de carta: {card.card_sets?.[0]?.set_code}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'lightblue',
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

export default YuGiOhCard;