import React from 'react';
import { View } from 'react-native';
import PokemonCard from '../../components/PokemonCard';
import YuGiOhCard from '../../components/YuGiOhCard';
import styles from 'screens/ItemDetailScreen/ItemDetailScreen.styles';

export default function ItemDetailScreen({ route }) {
    const { card, type } = route.params; 

    const renderCard = () => {
        switch (type) {
            case 'Pokemon':
                return <PokemonCard card={card} />;
            case 'YuGiOh':
                return <YuGiOhCard card={card} />;
            default:
                return <Text>Tipo de carta no soportado</Text>;
        }
    };

    return (
        <View style={styles.container}>
            {renderCard()}
        </View>
    );
}