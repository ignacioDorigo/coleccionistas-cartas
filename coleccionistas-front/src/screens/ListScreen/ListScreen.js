// src/screens/ListScreen.js
import React from 'react';
import { View } from 'react-native';
import CardList from 'components/CardList';
import { lightTheme, darkTheme } from 'constants/themes';
import { useTheme } from 'context/ThemeContext';

import createStyles from './ListScreen.styles';

const ListScreen = ({ apiUrl, extractData, extractImageUrl, title, headers, type }) => {
    const { isDarkTheme } = useTheme();
    const theme = isDarkTheme ? darkTheme : lightTheme;
    const styles = createStyles(theme);

    return (
        <View style={styles.container}>
            <CardList
                apiUrl={apiUrl}
                extractData={extractData}
                extractImageUrl={extractImageUrl}
                title={title}
                headers={headers}
                type={type}
            />
        </View>
    );
}

export default ListScreen;