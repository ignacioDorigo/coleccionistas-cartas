import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#F5F7FA',
    },
    header: {
        marginVertical: 10,
    },
    header__text: {
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
    },
    image: {
        resizeMode: 'contain',
        width: "100%",
        height: 100,
    },
    inputContainer: {
        // backgroundColor:"red",  
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