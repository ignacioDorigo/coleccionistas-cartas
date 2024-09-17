import React from 'react';
import CardList from '../components/CardList';

const ListScreen = ({ apiUrl, extractData, extractImageUrl, title, headers }) => {
    return (
        <CardList
            apiUrl={apiUrl}
            extractData={extractData}
            extractImageUrl={extractImageUrl}
            title={title}
            headers={headers}
        />
    );
}

export default ListScreen;