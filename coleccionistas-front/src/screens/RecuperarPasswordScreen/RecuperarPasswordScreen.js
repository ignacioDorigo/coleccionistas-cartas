import {
    View,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "context/ThemeContext";
import { lightTheme, darkTheme } from "constants/themes";
import createStyles from "screens/LoginScreen/LoginScreen.styles";

export function RecuperarPasswordScreen() {
    const { isDarkTheme } = useTheme();
    const theme = isDarkTheme ? darkTheme : lightTheme;
    const styles = createStyles(theme);
    const [mail, setMail] = useState("");
    const navegador = useNavigation();
    const [isLoading, setIsLoading] = useState(false);

    const onRecuperarPress = () => {
        setIsLoading(true);
        axios
            .get(
                `http://192.168.0.108:8080/coleccionistas/recuperarPassword?mail=${mail}`
            )
            .then((response) => {
                Alert.alert(
                    "Éxito",
                    response.data,
                    [
                        {
                            text: "Aceptar",
                            onPress: () => {
                                navegador.navigate("Login");
                            }
                        }
                    ],
                    { cancelable: false }
                );
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
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
                        <Image source={require("assets/splash.png")} style={styles.image} />
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.text}>
                            Envio de contraseña temporal.
                        </Text>
                        <Text style={styles.text}>
                            Recuerde cambiarla una vez que haya ingresado.
                        </Text>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={setMail}
                            value={mail}
                            placeholder="equipo5@gmail.com"
                        />
                        <TouchableOpacity style={styles.ingresar} onPress={onRecuperarPress} disabled={isLoading}>
                            <LinearGradient
                                {...styles.gradientColors}
                                style={styles.gradient}
                            >
                            {isLoading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text style={styles.textLight}>Recuperar</Text>
                            )}
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
}

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
