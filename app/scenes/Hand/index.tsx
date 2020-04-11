import React from 'react';

import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

import { RootStackParamList } from "../../../App";
import { HandImpl } from "./HandImpl";

type HandScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Hand'>;
type HandScreenRouteProp = RouteProp<RootStackParamList, 'Hand'>;
type HandScreenProps = {
    navigation: HandScreenNavigationProp;
    route: HandScreenRouteProp;
};

export default class Hand extends React.Component<HandScreenProps> {
    render() {
        return <HandImpl
            playerName={this.props.route.params.playerName}
            gameCode={this.props.route.params.gameCode}
            gameName={this.props.route.params.gameName}
            password={this.props.route.params.password}
            onBack={this.props.navigation.goBack} />;
    }
};
