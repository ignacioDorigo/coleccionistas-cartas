import React, { useState } from 'react';
import { View, Alert, StatusBar } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import styles from './RegisterScreen.styles';

import { Button, Icon, Input, Text, Image } from '@rneui/base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFormik } from 'formik';
import Toast from 'react-native-toast-message';

import { initialValues, validationSchema } from './RegisterForm.data'

const Register = () => {

    const navegador = useNavigation();

    const [ocultarPassword, setOcultarPassword] = useState(true);

    const mostrarOcultarPassword = () => {
        return (setOcultarPassword(prevState => !prevState))
    }

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formulario) => {
            try {
                await axios.post(`http://192.168.1.71:8080/coleccionistas/register?mail=${formulario.mail}&password=${formulario.password}&edad=${formulario.edad}&nombre=${formulario.nombre}&apellido=${formulario.apellido}`)
                    .then(response => {
                        Alert.alert("Éxito", response.data);
                        navegador.navigate("Login");
                    })
                    .catch(error => Alert.alert("Error", error.response.data));

            } catch (error) {
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error al registrarse, intente mas tarde"
                })
            }
        }
    });

    return (
        <KeyboardAwareScrollView style={styles.container}>
            <StatusBar barStyle='default' ></StatusBar>
            <View style={styles.header}>
                <Image source={require("../../assets/icon22.png")} style={styles.image}></Image>
                <Text style={styles.header__text}>Create una cuenta y empeza una verdadera experiencia Findex</Text>
            </View>

            <View>
                <Input
                    inputContainerStyle={styles.inputContainer}
                    autoCapitalize='none'
                    onChangeText={(text) => formik.setFieldValue("mail", text)}
                    errorMessage={formik.errors.mail}
                    placeholder="Email"
                    rightIcon={
                        <Icon
                            type="material-community"
                            name="at"
                            iconStyle={styles.icon}
                        ></Icon>
                    }
                />

                <Input
                    autoCapitalize='none'
                    inputContainerStyle={styles.inputContainer}
                    onChangeText={(text) => formik.setFieldValue("password", text)}
                    errorMessage={formik.errors.password}
                    placeholder="Password"
                    secureTextEntry={ocultarPassword ? true : false}
                    rightIcon={
                        <Icon
                            type="material-community"
                            name={ocultarPassword ? "eye-off-outline" : "eye-outline"}
                            iconStyle={styles.icon}
                            onPress={mostrarOcultarPassword}
                        ></Icon>
                    }
                />

                <Input
                    autoCapitalize='none'
                    inputContainerStyle={styles.inputContainer}
                    onChangeText={(edad) => formik.setFieldValue("edad", edad)}
                    errorMessage={formik.errors.edad}
                    placeholder="Edad"
                    keyboardType="numeric"
                    rightIcon={
                        <Icon
                            type="material-community"
                            name="numeric"
                            iconStyle={styles.icon}
                        ></Icon>
                    }

                />

                <Input
                    autoCapitalize='none'
                    inputContainerStyle={styles.inputContainer}
                    onChangeText={(nombre) => formik.setFieldValue("nombre", nombre)}
                    errorMessage={formik.errors.nombre}
                    placeholder="Nombre"
                    rightIcon={
                        <Icon
                            type="material-community"
                            name="card-account-details-outline"
                            iconStyle={styles.icon}
                        ></Icon>
                    }

                />

                <Input
                    autoCapitalize='none'
                    inputContainerStyle={styles.inputContainer}
                    onChangeText={(apellido) => formik.setFieldValue("apellido", apellido)}
                    errorMessage={formik.errors.apellido}
                    placeholder="Apellido"
                    rightIcon={
                        <Icon
                            type="material-community"
                            name="card-account-details-outline"
                            iconStyle={styles.icon}
                        ></Icon>
                    }
                />

                <Button buttonStyle={styles.btn} titleStyle={styles.btnTitle} title='Registrarse' onPress={formik.handleSubmit} loading={formik.isSubmitting} />
                <Toast />
            </View>

        </KeyboardAwareScrollView >
    );
};

export default Register;
