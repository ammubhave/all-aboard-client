import React from 'react';
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../../../App";
import BoardImpl from "./BoardImpl";

type BoardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Board'>;
type BoardScreenRouteProp = RouteProp<RootStackParamList, 'Board'>;
type BoardScreenProps = { navigation: BoardScreenNavigationProp, route: BoardScreenRouteProp; };

export default class Board extends React.Component<BoardScreenProps> {
    render() {
        return <BoardImpl
            gameCode={this.props.route.params.gameCode}
            gameName={this.props.route.params.gameName}
            password={this.props.route.params.password}
            onBack={this.props.navigation.goBack} />;
    }
}
