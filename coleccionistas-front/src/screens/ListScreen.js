import React from 'react';
import CardList from '../components/CardList';

const ListScreen = ({ apiUrl, extractData, extractImageUrl, title, headers, type }) => {
    return (
        <CardList
            apiUrl={apiUrl}
            extractData={extractData}
            extractImageUrl={extractImageUrl}
            title={title}
            headers={headers}
            type={type}
        />
    );
}

export default ListScreen;