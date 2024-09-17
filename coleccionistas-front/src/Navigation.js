import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ListScreen from "./screens/ListScreen";

const Tab = createBottomTabNavigator();
const HomeStackNavigator = createNativeStackNavigator();

function HomeStack() {
    return (
        <HomeStackNavigator.Navigator initialRouteName="HomeScreen">
            <HomeStackNavigator.Screen name="HomeScreen" component={HomeScreen} />
            <HomeStackNavigator.Screen name="Pokemon">
                {(props) => (
                    <ListScreen 
                        {...props}
                        apiUrl={(page) => `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=50`}
                        extractData={(data) => data.data}
                        extractImageUrl={(item) => item.images.small}
                        title="Cartas de Pokémon"
                        headers={{ 'Authorization': `Bearer 76c25664-e901-47bf-a60c-65ca1762d4a6` }}
                    />
                )}
            </HomeStackNavigator.Screen>
            <HomeStackNavigator.Screen name="YuGiOh">
                {(props) => (
                    <ListScreen 
                        {...props}
                        apiUrl={() => `https://db.ygoprodeck.com/api/v7/cardinfo.php`}
                        extractData={(data) => data.data}
                        extractImageUrl={(item) => item.card_images[0].image_url}
                        title="Cartas de Yu-Gi-Oh!"
                    />
                )}
            </HomeStackNavigator.Screen>
        </HomeStackNavigator.Navigator>
    );
}

function Tabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tabs />
        </NavigationContainer>
    );
}