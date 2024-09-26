import React from 'react';
import { View, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image, Text } from '@rneui/base';
import styles from './RegisterScreen.styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm'

export function RegisterScreen() {

    const navegador = useNavigation();

    return (
        <KeyboardAwareScrollView style={styles.container} contentContainerStyle={styles.contenidoScroll}>

            <StatusBar barStyle='default' />
            <View style={styles.header}>
                <Image source={require("../../assets/icon22.png")} style={styles.image}></Image>
                <Text style={styles.header__text}>Create una cuenta y empeza una verdadera experiencia Findex</Text>
            </View>

            <RegisterForm />

        </KeyboardAwareScrollView >
    );
};

