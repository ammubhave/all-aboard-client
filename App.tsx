import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./app/scenes/Home";
import GameScreen from "./app/scenes/GameScreen";

console.disableYellowBox = true;

export type RootStackParamList = {
  Home: undefined;
  GameScreen: { playerName: string, gameName: string; gameCode: string; password: string; };
};
const RootStack = createStackNavigator<RootStackParamList>();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <RootStack.Navigator headerMode="screen">
          <RootStack.Screen name="Home" component={Home} options={{ headerTitle: "All A-Board" }} />
          <RootStack.Screen name="GameScreen" component={GameScreen} options={{ headerShown: false }} />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}