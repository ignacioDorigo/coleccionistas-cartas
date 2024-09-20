import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function MisCartasSet({ route, navigation }) {
    const { mail, set } = route.params;
    console.log(mail);
    console.log(set);
    const [mazoMio, setMazoMio] = useState([]);
    const [mazo, setMazo] = useState([]);

    useEffect(() => {
        axios.get(`https://api.pokemontcg.io/v2/cards/?q=id:${mazo.id}&select=id,name,images`, {
            headers: {
                'Authorization': `Bearer d9a5dcd2-e55a-4842-a1ec-278e15879a1d` // ACA PONGAN SU API KEY AMIGOS ,DESDPUES DEL BEARER (DESPUES ME FIJO COMO PONERLO EN BACK)
            }
        }).then(response => setMazo(response.data.data))
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        axios.get(`http://192.168.1.29:8080/coleccionistas/misCartasSet?mail=${mail}&idSet=${set.id_set}`)
            .then(response => setMazoMio(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <View>
            <Text>MisCartasSet</Text>
            <ScrollView></ScrollView>
        </View>
    )
}