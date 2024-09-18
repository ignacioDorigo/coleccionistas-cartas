import { StyleSheet } from 'react-native';

const createStyles = (theme) => StyleSheet.create({
    fondoLogo: {
        height: '30%',
        width: '100%',
        position: 'relative',
        backgroundColor: theme.primary,
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
        backgroundColor: theme.background,
    },
    title: {
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 45,
        textTransform: 'capitalize',
        color: theme.text,
    },
    text: {
        color: theme.text,
        fontSize: 15,
    },
    textLight: {
        color: theme.textLight,
        fontSize: 15,
    },
    label: {
        marginTop: 15,
        fontSize: 18,
        marginBottom: 8,
        color: theme.primary,
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
    input: {
        height: 50,
        borderColor: theme.secundary,
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
        color: theme.secundary
    },
    gradient: {
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradientColors: {
        colors: [theme.primary, theme.secundary],
    },
});

export default createStyles;
