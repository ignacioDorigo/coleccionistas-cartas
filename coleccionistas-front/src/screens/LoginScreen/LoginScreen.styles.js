import { StyleSheet } from 'react-native';

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

export default styles;