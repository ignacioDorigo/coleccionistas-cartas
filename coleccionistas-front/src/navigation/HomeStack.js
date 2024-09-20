import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from 'screens/HomeScreen/HomeScreen';
import ListScreen from 'screens/ListScreen/ListScreen';
import ItemDetailScreen from 'screens/ItemDetailScreen/ItemDetailScreen';
import AddCollection from '../screens/AddColecction/AddCollection';
import ElegirSetPokemon from '../screens/ElegirSetPokemon/ElegirSetPokemon';
import CartasSet from '../screens/CartasSet/CartasSet';
import MisSetsPokemon from '../screens/MisSetsPokemon/MisSetsPokemon';
import MisCartasSet  from '../screens/MisCartasSet/MisCartasSet';

const HomeStackNavigator = createNativeStackNavigator();

export default function HomeStack() {
    return (
        <HomeStackNavigator.Navigator initialRouteName="HomeScreen">
            <HomeStackNavigator.Screen name="HomeScreen" component={HomeScreen} />
            <HomeStackNavigator.Screen name='CrearColeccion' component={AddCollection} />
            <HomeStackNavigator.Screen name='ElegirSetPokemon' component={ElegirSetPokemon}></HomeStackNavigator.Screen>
            <HomeStackNavigator.Screen name='CartasSet' component={CartasSet}></HomeStackNavigator.Screen>
            <HomeStackNavigator.Screen name='MisSetsPokemon' component={MisSetsPokemon}></HomeStackNavigator.Screen>
            <HomeStackNavigator.Screen name='MisCartasSet' component={MisCartasSet}></HomeStackNavigator.Screen>
            <HomeStackNavigator.Screen name="Pokemon">
                {(props) => (
                    <ListScreen
                        {...props}
                        apiUrl={(page) => `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=50`}
                        extractData={(data) => data.data}
                        extractImageUrl={(item) => item.images.small}
                        title="Cartas de Pokémon"
                        headers={{ 'Authorization': 'Bearer 76c25664-e901-47bf-a60c-65ca1762d4a6' }}
                        type="Pokemon"
                    />
                )}
            </HomeStackNavigator.Screen>
            <HomeStackNavigator.Screen name="YuGiOh">
                {(props) => (
                    <ListScreen
                        {...props}
                        apiUrl={() => 'https://db.ygoprodeck.com/api/v7/cardinfo.php'}
                        extractData={(data) => data.data}
                        extractImageUrl={(item) => item.card_images[0].image_url}
                        title="Cartas de Yu-Gi-Oh!"
                        type="YuGiOh"
                    />
                )}
            </HomeStackNavigator.Screen>
            <HomeStackNavigator.Screen name="ItemDetail" component={ItemDetailScreen} />
        </HomeStackNavigator.Navigator>
    );
}