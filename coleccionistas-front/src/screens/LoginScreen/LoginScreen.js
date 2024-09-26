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
} from "react-native";
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "context/ThemeContext";
import { lightTheme, darkTheme } from "constants/themes";
import createStyles from "screens/LoginScreen/LoginScreen.styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function LoginScreen({ navigation }) {
    const { isDarkTheme } = useTheme();
    const theme = isDarkTheme ? darkTheme : lightTheme;
    const styles = createStyles(theme);
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const navegador = useNavigation();
    const { login } = useContext(AuthContext);

    const onLoginPress = () => {
        axios
            .post(
                `http://192.168.1.71:8080/coleccionistas/login?mail=${mail}&password=${password}`
            )
            .then((response) => {
                Alert.alert("Éxito", response.data);
                login(mail);
            })
            .catch((error) => {
                Alert.alert("Error", error.response.data);
            });
    };

    return (
        <>
            <StatusBar style="light" />
            <View
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}>
                    <View style={styles.fondoLogo}>
                        <Image source={require("assets/splash.png")} style={styles.image} />
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.title}>Bienvenido</Text>
                        <Text style={styles.text}>
                            Completa los campos para ingresar
                        </Text>
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
                                {...styles.gradientColors}
                                style={styles.gradient}
                            >
                                <Text style={styles.textLight}>Ingresar</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <View style={styles.register}>
                            <Text style={styles.text}>¿Te olvidaste la contraseña?</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navegador.navigate("Recuperar");
                                }}
                            >
                                <Text style={styles.click}>Click aquí</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.register}>
                            <Text style={styles.text}>¿Todavía no te has registrado?</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navegador.navigate("Register");
                                }}
                            >
                                <Text style={styles.click}>Click aquí</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </>
    );
}
