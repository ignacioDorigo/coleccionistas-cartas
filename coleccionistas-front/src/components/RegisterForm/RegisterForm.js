import React, { useState } from 'react'
import { Alert, View } from 'react-native'
import { Icon, Button, Input } from '@rneui/base'
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './RegisterForm.data'


// Estilos
import { styles } from './RegisterForm.styles'
import { useNavigation } from '@react-navigation/native';

export function RegisterForm() {

    const navegador = useNavigation();

    const [showPassword, setShowPassword] = useState(true);

    const mostrarOcultarPassword = () => {
        return (setShowPassword(prevState => !prevState))
    }

    const formik = useFormik({
        initialValues: initialValues(),
        validateOnChange: false,
        validationSchema: validationSchema(),
        onSubmit: async (formulario) => {
            const { mail, password, edad, nombre, apellido } = formulario;
            await axios.post(`http://192.168.1.5:8080/coleccionistas/register?mail=${mail}&password=${password}&edad=${edad}&nombre=${nombre}&apellido=${apellido}`)
                .then((response) => {
                    Alert.alert("Exito", response.data, [
                        {
                            text: "OK",
                            onPress: () => navegador.navigate('Login'), // Navegar a otra pantalla
                        }
                    ])
                })
                .catch((error) => {
                    Alert.alert("Error", error.response.data)
                })
        }
    });


    return (
        <View>

            <Input
                placeholder="correo@electronico.com"
                autoCapitalize="none"
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                errorMessage={formik.errors.mail}
                keyboardType='email-address'
                onChangeText={(datoInput) => formik.setFieldValue("mail", datoInput)}
                rightIcon={
                    <Icon type="material-community" name="at" iconStyle={styles.icon} />
                }
            />

            <Input
                placeholder="Password"
                autoCapitalize="none"
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                errorMessage={formik.errors.password}
                secureTextEntry={showPassword === false ? false : true}
                onChangeText={(datoInput) => formik.setFieldValue("password", datoInput)}
                rightIcon={
                    <Icon type="material-community"
                        name={showPassword === false ? "eye-outline" : "eye-off-outline"}
                        iconStyle={styles.icon}
                        onPress={mostrarOcultarPassword}
                    />
                }
            />

            <Input
                placeholder="Edad"
                autoCapitalize="none"
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                errorMessage={formik.errors.edad}
                returnKeyType="done"
                keyboardType='numeric'
                onChangeText={(datoInput) => formik.setFieldValue("edad", datoInput)}
                rightIcon={
                    <Icon type="material-community" name="numeric" iconStyle={styles.icon} />
                }
            />

            <Input
                placeholder="Nombre"
                autoCapitalize="none"
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                errorMessage={formik.errors.nombre}
                onChangeText={(datoInput) => formik.setFieldValue("nombre", datoInput)}
                rightIcon={
                    <Icon type="material-community" name="card-account-details-outline" iconStyle={styles.icon} />
                }
            />

            <Input
                placeholder="Apellido"
                autoCapitalize="none"
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                errorMessage={formik.errors.apellido}
                onChangeText={(datoInput) => formik.setFieldValue("apellido", datoInput)}
                rightIcon={
                    <Icon type="material-community" name="card-account-details-outline" iconStyle={styles.icon} />
                }
            />

            <Button
                title="Registrarse"
                onPress={formik.handleSubmit}
                titleStyle={styles.buttonText}
                containerStyle={styles.buttonContainer}
                loading={formik.isSubmitting}
            />
        </View>
    );
}