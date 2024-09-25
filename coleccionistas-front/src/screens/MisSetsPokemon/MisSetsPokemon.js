import React, { useEffect, useState, useContext } from 'react'
import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios'

export default function MisSetsPokemon({ navigation }) {
    const { isLoggedIn } = useContext(AuthContext);
    const mail = isLoggedIn;

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
                    <TouchableOpacity onPress={() => { navigation.navigate("MisCartasSet", { set: set }) }}>
                        <Text>{set.id_set}</Text>
                    </TouchableOpacity>
                </View>
            ))}

        </View>
    )
}