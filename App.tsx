import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./app/scenes/Home";
import Hand from "./app/scenes/Hand";
import Board from "./app/scenes/Board";

console.disableYellowBox = true;

export type RootStackParamList = {
  Home: undefined;
  Board: { game: string; };
  Hand: { playerName: string, game: string; };
};
const RootStack = createStackNavigator<RootStackParamList>();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <RootStack.Navigator headerMode="screen">
          <RootStack.Screen name="Home" component={Home} />
          <RootStack.Screen name="Board" component={Board} options={{ headerShown: false }} />
          <RootStack.Screen name="Hand" component={Hand} />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}