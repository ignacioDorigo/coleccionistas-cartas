import { View, Text, Button, TextInput, Alert, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const navegador = useNavigation();

    const ingre = () => {

        // axios.post("http://localhost:8080/coleccionistas/login", data)
        axios.post(`http://localhost:8080/coleccionistas/login?mail=${mail}&password=${password}`)
            .then(response => {
                Alert.alert("Éxito", response.data);
                navegador.navigate("Home");
            })
            .catch(error => {
                Alert.alert("Error", error.response.data);
            });

    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Ingrese email</Text>
            <TextInput
                style={styles.input}
                autoCapitalize='none'
                onChangeText={setMail}
                value={mail}
                placeholder="Email"
            />

            <Text style={styles.label}>Ingrese password</Text>
            <TextInput
                style={styles.input}
                autoCapitalize='none'
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                secureTextEntry
            />

            <Button title='Ingresar' onPress={ingre} />

            <Button title='Todavia no te has registrado?' onPress={() => navegador.navigate("Register")}></Button>
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
    }
});
