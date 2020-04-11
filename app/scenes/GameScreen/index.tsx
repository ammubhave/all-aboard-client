import React from 'react';
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../../../App";
import GameScreenImpl from "./GameScreenImpl";

type GameScreenSceneNavigationProp = StackNavigationProp<RootStackParamList, 'GameScreen'>;
type GameScreenSceneRouteProp = RouteProp<RootStackParamList, 'GameScreen'>;
type GameScreenProps = { navigation: GameScreenSceneNavigationProp, route: GameScreenSceneRouteProp; };

const GameScreen: React.FunctionComponent<GameScreenProps> = (props) => {
    return <GameScreenImpl
        playerName={props.route.params.playerName}
        gameCode={props.route.params.gameCode}
        gameName={props.route.params.gameName}
        password={props.route.params.password}
        onBack={props.navigation.goBack} />;
};

export default GameScreen;