import { StyleSheet } from 'react-native';

const createStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: theme.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    header__text: {
        fontWeight: 'bold',
        fontSize: 30,
    },
    header__svg: {
        color:'red',
    },
    text: {
        fontSize: 24,
        // marginBottom: 20,
        color: theme.text,
    },
    button: {
        backgroundColor: theme.primary,
        padding: 10,
    },
    buttonText: {
        color: theme.textLight,
        fontSize: 18,
    }
});

export default createStyles;
