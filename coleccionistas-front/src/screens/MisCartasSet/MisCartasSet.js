import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MisCartasSet({ route, navigation }) {
    const { mail, set } = route.params;

    const [mazoMio, setMazoMio] = useState([]);
    const [mazoCompleto, setMazoCompleto] = useState([]);

    useEffect(() => {
        axios.get(`https://api.pokemontcg.io/v2/cards/?q=id:${set.id_set}&select=id,name,images`, {
            headers: {
                'Authorization': `Bearer d9a5dcd2-e55a-4842-a1ec-278e15879a1d` // Reemplaza con tu API key
            }
        })
            .then(response => setMazoCompleto(response.data.data))
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        axios.get(`http://192.168.1.29:8080/coleccionistas/misCartasSet?mail=${mail}&idSet=${set.id_set}`)
            .then(response => setMazoMio(response.data.map(card => card.id_card)))
            .catch(error => console.log(error));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mis Cartas</Text>
            <ScrollView style={styles.scrollView}>
                {mazoCompleto.map((card, index) => (
                    <View key={index} style={styles.cardContainer}>
                        <Image resizeMode='contain'
                            style={styles.cardImage}
                            source={{ uri: card.images.small }}
                        />
                        {mazoMio.includes(card.id) ?
                            <Text style={styles.highlightedText}>La tenes</Text> :
                            <Text style={styles.noTenes}>No la tenes</Text>
                        }
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    scrollView: {
        flex: 1,
    },
    cardContainer: {
        alignItems: 'center',
        marginBottom: 15,
    },
    cardImage: {
        width: '100%',
        height: 350, // Cambia la altura si es necesario
        marginBottom: 5, // Espaciado entre la imagen y el texto
    },
    highlightedText: {
        padding: 4,
        color: 'white',
        backgroundColor: 'green',
        fontWeight: 'bold',
        marginTop: 5,
        width: '70%',
        textAlign: 'center',
    },
    noTenes: {
        padding: 4,
        color: 'white',
        backgroundColor: 'red',
        fontWeight: 'bold',
        marginTop: 5,
        width: '70%',
        textAlign: 'center',
    }
});
