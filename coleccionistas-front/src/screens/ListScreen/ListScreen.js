// src/screens/ListScreen.js
import React from 'react';
import { View } from 'react-native';
import CardList from 'components/CardList';
import styles from 'screens/ListScreen/ListScreen.styles';

const ListScreen = ({ apiUrl, extractData, extractImageUrl, title, headers, type }) => {
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