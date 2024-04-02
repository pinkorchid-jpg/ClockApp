import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import MainClock from '../screens/MainClock';
import Stopwatch from '../screens/Stopwatch';
import Alarm from '../screens/Alarm';


const Tab = createBottomTabNavigator();

export default function Navigate() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "black",
                tabBarInactiveTintColor: "gray",
            }}
        >
            <Tab.Screen
                name="Main Clock"
                component={MainClock}
                options={{
                    tabBarLabel: "World Clock",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="globe" color={color} size={size} />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Stopwatch"
                component={Stopwatch}
                options={{
                    tabBarLabel: "Stopwatch",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="hourglass" color={color} size={size} />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Alarm"
                component={Alarm}
                options={{
                    tabBarLabel: "Alarm",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="hourglass" color={color} size={size} />
                    ),
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    );
}
