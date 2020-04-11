import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./app/scenes/Home";
import Hand from "./app/scenes/Hand";
import HandAndBoard from "./app/scenes/HandAndBoard";
import Board from "./app/scenes/Board";

console.disableYellowBox = true;

export type RootStackParamList = {
  Home: undefined;
  Board: { gameName: string; gameCode: string; password: string; };
  Hand: { playerName: string, gameName: string; gameCode: string; password: string; };
  HandAndBoard: { playerName: string, gameName: string; gameCode: string; password: string; };
};
const RootStack = createStackNavigator<RootStackParamList>();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <RootStack.Navigator headerMode="screen">
          <RootStack.Screen name="Home" component={Home} options={{ headerTitle: "All A-Board" }} />
          <RootStack.Screen name="Board" component={Board} options={{ headerShown: false }} />
          <RootStack.Screen name="Hand" component={Hand} options={{ headerShown: false }} />
          <RootStack.Screen name="HandAndBoard" component={HandAndBoard} options={{ headerShown: false }} />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}