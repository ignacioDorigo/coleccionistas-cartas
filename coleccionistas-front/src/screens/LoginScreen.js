import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from "expo-status-bar";

const Login = () => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const navegador = useNavigation();
    const { login } = useContext(AuthContext);

    const onLoginPress = () => {
        axios
            .post(
                `http://192.168.1.49:8080/coleccionistas/login?mail=${mail}&password=${password}`
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
        <>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.fondoLogo}>
                        <Image
                            source={require('../../assets/splash.png')}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.title}>Bienvenido</Text>
                        <Text style={styles.subtitle}>Completa los campos para ingresar</Text>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={setMail}
                            value={mail}
                            placeholder="equipo5@gmail.com"
                        />
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={setPassword}
                            value={password}
                            placeholder="*******"
                            secureTextEntry
                        />
                        <TouchableOpacity style={styles.ingresar} onPress={onLoginPress}>
                            <LinearGradient
                                colors={['#7B2CBF', '#9D4EDD']}
                                style={styles.gradient}
                            >
                                <Text style={styles.text}>Ingresar</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <View style={styles.register}>
                            <Text style={styles.todavia}>¿Todavía no te has registrado?</Text>
                            <TouchableOpacity onPress={() => { navegador.navigate("Register") }}>
                                <Text style={styles.click}>Click aquí</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
};

export default Login;

const styles = StyleSheet.create({
    fondoLogo: {
        height: '30%',
        width: '100%',
        position: 'relative',
        backgroundColor: '#3C096C',
    },
    image: {
        position: 'absolute',
        width: '100%',
        marginTop: 40,
        height: '80%',
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        padding: 22,
        backgroundColor: "#f0f0f0",
    },
    title: {
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 45,
        textTransform: 'capitalize',
    },
    subtitle: {
        fontSize: 15,
    },
    label: {
        marginTop: 15,
        fontSize: 18,
        marginBottom: 8,
        color: "#7B2CBF",
        fontWeight: 'bold',
    },
    ingresar: {
        borderRadius: 10,
        overflow: 'hidden',
        width: '40%',
        alignSelf: 'flex-end'
    },
    gradient: {
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
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
    register: {
        textAlign: "center",
        alignItems: 'center',
        marginTop: 30,
    },
    click: {
        fontWeight: 'bold',
    },
});
