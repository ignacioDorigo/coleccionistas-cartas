import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native'

export default function Home({ navigation }) {
    return (
        <View>
            <Text>Bienveinodooosda</Text>
            <Button 
                title='Pokemon'
                onPress = {() => navigation.navigate('Pokemon')}
            />

            <Button 
                title='Yu-Gi-Oh!'
                onPress = {() => navigation.navigate('Yu-Gi-Oh!')}
            />
        </View>
    )
}