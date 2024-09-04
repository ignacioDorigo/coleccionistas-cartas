import { View, Text, Button, TextInput, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [edad, setEdad] = useState(0);
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
        

        axios.post("http://localhost:8080/coleccionistas/register", formData)
            .then(response => {
                Alert.alert("Exito",response.data);
                navegador.navigate("Login");
                
            })
            .catch(error => Alert.alert("Error", error.response.data));

    }
    return (
        <View style={styles.container}>

            <Text style={styles.label} >Ingrese email</Text>
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
            />

            <Text style={styles.label}>Ingrese edad</Text>
            <TextInput
                style={styles.input}
                autoCapitalize='none'
                onChangeText={setEdad}
                value={edad}
                placeholder="Edad"
            />

            <Text style={styles.label}>Ingrese nombre</Text>
            <TextInput
                style={styles.input}
                autoCapitalize='none'
                onChangeText={setNombre}
                value={nombre}
                placeholder="Nombre"
            />

            <Text style={styles.label} >Ingrese apellido</Text>
            <TextInput
                style={styles.input}
                autoCapitalize='none'
                onChangeText={setApellido}
                value={apellido}
                placeholder="Apellido"
            />

            <Button title='Registrarse' onPress={registrarse} />
        </View>


    )
}

export default Register

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
