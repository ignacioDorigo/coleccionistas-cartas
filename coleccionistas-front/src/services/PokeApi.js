import React from 'react';
import CardList from '../components/CardList';

const API_KEY = '76c25664-e901-47bf-a60c-65ca1762d4a6';

export default function Pokemon() {
    const apiUrl = (page) => `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=50`;
    const extractData = (data) => data.data;
    const extractImageUrl = (item) => item.images.small;
    const headers = {
        'Authorization': `Bearer ${API_KEY}`
    };

    return (
        <CardList
            apiUrl={apiUrl}
            extractData={extractData}
            extractImageUrl={extractImageUrl}
            title="Cartas de Pokémon"
            headers={headers}
        />
    );
}