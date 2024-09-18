import { StyleSheet } from 'react-native';

const createStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: theme.background,
    },
    text: {
        fontSize: 24,
        marginBottom: 20,
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
