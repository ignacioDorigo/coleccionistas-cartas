import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function CartasSet({ route, navigation }) {
    // Mail de prueba que despues hay que ver como lo pasamos, ya sea por params o por el context
    const { mazo, mail } = route.params;
    console.log("mail del user: " + mail);


    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axios.get(`https://api.pokemontcg.io/v2/cards/?q=id:${mazo.id}&select=id,name,images`, {
                    headers: {
                        'Authorization': `Bearer d9a5dcd2-e55a-4842-a1ec-278e15879a1d` // ACA PONGAN SU API KEY AMIGOS ,DESDPUES DEL BEARER (DESPUES ME FIJO COMO PONERLO EN BACK)
                    }
                });
                setCards(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCards();
    }, [mazo.id]);

    const AgregarCartaAColeccion = (idCard) => {

        Alert.alert(
            "Confirmación",
            "¿Está seguro que quiere agregar esta carta a tu mazo?",
            [
                {
                    text: "CANCELAR",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "ACEPTO",
                    onPress: () => {
                        axios.post(`http://192.168.1.29:8080/coleccionistas/agregarCarta?mail=${mail}&idSet=${mazo.id}&idCard=${idCard}`)
                            .then((response) => (Alert.alert("Exito", response.data)))
                            .catch((error) => (Alert.alert("Error", `${error.response.data}`)))
                    }
                }
            ],
            { cancelable: false }
        );


    }

    return (
        <View style={styles.container}>

            <ScrollView style={styles.cartas}>
                <Text style={styles.title}>Mazo {mazo.name}</Text>
                {cards.map((card, index) => (
                    <View key={index} style={styles.card}>
                        <TouchableOpacity>
                            <Image style={styles.card__imagen} resizeMode='contain' source={{ uri: `${card.images.small}` }} />
                        </TouchableOpacity>
                        <View style={styles.card__botones}>

                            <TouchableOpacity onPress={() => AgregarCartaAColeccion(card.id)}>
                                <Text style={styles.card__svg}>Agregar</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 0,

    },
    title: {
        fontWeight: 'bold',
        fontSize: 23,
        marginVertical: 30,
        textAlign: 'center'
    },
    cartas: {

    },
    card: {
        maxWidth: '80%',
        marginVertical: 10,
        // borderWidth: 3,
        marginHorizontal: 40,
    },


    card__imagen: {
        width: '100%',
        height: 300,
    },
    card__svg: {
        fontWeight: 'bold',
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 3,
        textAlign: 'center',
        color: 'white',
        width: '70%',
        alignSelf: 'center',

    },

});
