import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Path from './screens/Path';
import Navigate from './navigation/Navigate';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Path" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Path" component={Path} />
        <Stack.Screen name="Navigate" component={Navigate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
