import { View, Text, TextInput, Alert, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from 'context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from "expo-status-bar";
import styles from "./LoginScreen.styles";

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
        <>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.fondoLogo}>
                        <Image
                            source={require("assets/splash.png")}
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


