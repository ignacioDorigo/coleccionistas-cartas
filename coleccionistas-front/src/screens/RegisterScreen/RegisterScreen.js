import { View, Text, Button, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import styles from './RegisterScreen.styles';

const Register = () => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [edad, setEdad] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const navegador = useNavigation();

    const registrarse = () => {
        const formData = new FormData();
        formData.append("mail", mail);
        formData.append("password", password);
        formData.append("edad", edad);
        formData.append("nombre", nombre);
        formData.append("apellido", apellido);

        axios.post("http://192.168.0.108:8080/coleccionistas/register", formData)
            .then(response => {
                Alert.alert("Éxito", response.data);
                navegador.navigate("Login");
            })
            .catch(error => Alert.alert("Error", error.response.data));
    };

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

            <Text style={styles.label}>Ingrese edad</Text>
            <TextInput
                style={styles.input}
                autoCapitalize='none'
                onChangeText={setEdad}
                value={edad}
                placeholder="Edad"
                keyboardType="numeric"
            />

            <Text style={styles.label}>Ingrese nombre</Text>
            <TextInput
                style={styles.input}
                autoCapitalize='none'
                onChangeText={setNombre}
                value={nombre}
                placeholder="Nombre"
            />

            <Text style={styles.label}>Ingrese apellido</Text>
            <TextInput
                style={styles.input}
                autoCapitalize='none'
                onChangeText={setApellido}
                value={apellido}
                placeholder="Apellido"
            />

            <Button title='Registrarse' onPress={registrarse} />
        </View>
    );
};

export default Register;
