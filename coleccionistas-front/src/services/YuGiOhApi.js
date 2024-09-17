import React from 'react';
import CardList from '../components/CardList';

export default function YuGiOh() {
    const apiUrl = () => `https://db.ygoprodeck.com/api/v7/cardinfo.php`;
    const extractData = (data) => data.data;
    const extractImageUrl = (item) => item.card_images[0].image_url;

    return (
        <CardList
            apiUrl={apiUrl}
            extractData={extractData}
            extractImageUrl={extractImageUrl}
            title="Cartas de Yu-Gi-Oh!"
        />
    );
}