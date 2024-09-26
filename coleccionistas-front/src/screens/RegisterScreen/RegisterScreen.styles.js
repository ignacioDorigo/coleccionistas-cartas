import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F7FA',
        marginBottom:10,
    },
    contenidoScroll:{
        paddingBottom:20,
    },
    header: {
        marginVertical: 10,
    },
    header__text: {
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
        marginBottom:30,
    },
    image: {
        resizeMode: 'contain',
        width: "100%",
        height: 80,
    },
    inputContainer: {
        padding: 5,
    },
    btn: {
        marginTop: 10,
        backgroundColor: "#240046"
    },
    btnTitle: {
        fontWeight: "bold",
        color: "#F5F7FA"
    },
    icon: {
        color: "#240046",
    }
});

export default styles;