import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';

import BaseBoard, { BoardProps } from '../BaseBoard';
import styles from "./styles";
import { MIN_WIDTH_HEIGHT } from "../jaipur/styles";

type State = {
    players: string[];
};

export default class CodenamesBoard extends React.Component<BoardProps, State> implements BaseBoard<State> {
    constructor(props: BoardProps) {
        super(props);
        this.state = { players: [] };
    }

    updateBoard(state: State) {
        this.setState(state);
    }

    updatePlayers(players: string[]) {
        this.setState({ players });
    }

    renderPlayerSelection() {
        const renderPlayerList = (team: string) => {
            const teamName = (team == "red" ? "Red" : "Blue") + " Team";

            return <View style={{
                flex: 3,
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                borderRadius: MIN_WIDTH_HEIGHT(3),
                margin: MIN_WIDTH_HEIGHT(2),
                padding: MIN_WIDTH_HEIGHT(2),
            }}>
                <Text style={{
                    textAlign: "center",
                    color: team,
                    fontSize: MIN_WIDTH_HEIGHT(3),
                    textShadowColor: "white",
                    textShadowRadius: 2,
                }}>{teamName}</Text>
                <Text>Hi</Text>
            </View>;
        };

        return <View style={{ flex: 1, flexDirection: "column" }}>
            <View style={{ flex: 1 }}>
            </View>
            <View style={{ flex: 5, flexDirection: "row" }}>
                <View style={{ flex: 1 }}></View>
                {renderPlayerList("red")}
                {renderPlayerList("blue")}
                <View style={{ flex: 1 }}></View>
            </View>
            <View style={{ flex: 1 }}></View>
        </View>;
    }

    render() {
        return <SafeAreaView style={styles.mat}>
            {this.renderPlayerSelection()}
        </SafeAreaView>;
    }
};
