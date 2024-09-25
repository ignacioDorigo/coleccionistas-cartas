import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function MisSetsPokemon({ route, navigation }) {
    const { mail } = route.params;

    const [misSets, setMisSets] = useState([]);

    useEffect(() => {
        axios.get(`http:/192.168.1.71:8080/coleccionistas/misSets?mail=${mail}`)
            .then(response => setMisSets(response.data))
            .catch(error => console.log(error))
    }, [])
    return (
        <View>
            <Text>Mis Sets Pokemon</Text>

            {misSets.map((set, index) => (
                <View key={index}>
                    <TouchableOpacity onPress={() => { navigation.navigate("MisCartasSet", { mail: mail, set: set }) }}>
                        <Text>{set.id_set}</Text>
                    </TouchableOpacity>
                </View>
            ))}

        </View>
    )
}