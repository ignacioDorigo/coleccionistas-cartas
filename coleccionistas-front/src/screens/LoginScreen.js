import { View, Text, Button, TextInput, Alert, StyleSheet } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const navegador = useNavigation();
    const { login } = useContext(AuthContext);


    const onLoginPress = () => {
        axios
            .post(
                `http://192.168.0.194:8080/coleccionistas/login?mail=${mail}&password=${password}`
            )
            .then((response) => {
                Alert.alert("Éxito", response.data);
                login();
            })
            .catch((error) => {
                Alert.alert("Error", error.response.data);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Ingrese email</Text>
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={setMail}
                value={mail}
                placeholder="Email"
            />

            <Text style={styles.label}>Ingrese password</Text>
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                secureTextEntry
            />

            <Button title="Ingresar" onPress={onLoginPress} />

            <Button
                title="Todavia no te has registrado?"
                onPress={() => navegador.navigate("Register")}
            ></Button>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f0f0f0",
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
        color: "#333",
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 10,
        marginBottom: 20,
        backgroundColor: "#fff",
    },
});