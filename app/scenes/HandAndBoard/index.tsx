import React from 'react';

import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { RouteProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BoardImpl } from "../Board";
import { View } from "react-native";
import { HandImpl } from "../Hand";

type HandAndBoardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HandAndBoard'>;
type HandAndBoardScreenRouteProp = RouteProp<RootStackParamList, 'HandAndBoard'>;
type HandAndBoardScreenProps = {
    navigation: HandAndBoardScreenNavigationProp;
    route: HandAndBoardScreenRouteProp;
};

export default class HandAndBoard extends React.Component<HandAndBoardScreenProps> {
    render() {
        return <HandAndBoardImpl
            playerName={this.props.route.params.playerName}
            gameCode={this.props.route.params.gameCode}
            gameName={this.props.route.params.gameName}
            password={this.props.route.params.password}
            onBack={this.props.navigation.goBack} />;
    }
}

type Props = {
    playerName: string,
    gameCode: string,
    gameName: string,
    password: string,
    onBack: () => void,
};
class HandAndBoardImpl extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return <SafeAreaView style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "black",
        }}>
            <View style={{ flex: 3 }}>
                <BoardImpl
                    gameCode={this.props.gameCode}
                    gameName={this.props.gameName}
                    password={this.props.password}
                    onBack={this.props.onBack} />
            </View>
            <View style={{ flex: 1 }}>
                <HandImpl
                    playerName={this.props.playerName}
                    gameCode={this.props.gameCode}
                    gameName={this.props.gameName}
                    password={this.props.password}
                    onBack={this.props.onBack} />
            </View>
        </SafeAreaView>;
    }
};
