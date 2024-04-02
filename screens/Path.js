import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Navigate from "../navigation/Navigate";
import MainClock from "./MainClock";
import Stopwatch from "./Stopwatch";
import Alarm from "./Alarm";


const Stack = createStackNavigator();

export default function Path() {
  return (
    <Stack.Navigator initialRouteName="Navigate">
      <Stack.Screen name="Navigate" component={Navigate} options={{ headerShown: false }} />
      <Stack.Screen name="MainClock" component={MainClock} options={{ title : "World Clock" }}  />
      <Stack.Screen name="Stopwatch" component={Stopwatch} options={{ title : "Stopwatch" }}  />
      <Stack.Screen name="Alarm" component={Alarm} options={{ title : "Alarm" }}  />
    </Stack.Navigator>
  );
}
