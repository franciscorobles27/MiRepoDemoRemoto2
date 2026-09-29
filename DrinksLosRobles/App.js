import React from 'react';

import {
    NavigationContainer
} from '@react-navigation/native';

import {
    createNativeStackNavigator
} from '@react-navigation/native-stack';


import SplashScreen from './pantallas/SplashScreen';

import HomeScreen from './pantallas/HomeScreen';

import DetalleBebidaScreen from './pantallas/DetalleBebidaScreen';

import PreparacionScreen from './pantallas/PreparacionScreen';


const Stack = createNativeStackNavigator();


export default function App() {

    return (
        <NavigationContainer>

            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{
                    headerShown: false
                }}
            >

                <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                />

                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                />

                <Stack.Screen
                    name="DetalleBebida"
                    component={DetalleBebidaScreen}
                />

                <Stack.Screen
                    name="Preparacion"
                    component={PreparacionScreen}
                />

            </Stack.Navigator>

        </NavigationContainer>
    );
}