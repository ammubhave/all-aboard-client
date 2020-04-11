import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';

import BaseBoard, { BoardProps } from '../BaseBoard';
import styles from "./styles";
import EStyleSheet from "react-native-extended-stylesheet";

type State = {
    players: {
        red: string[],
        redCodemaster: string | null,
        blue: string[],
        blueCodemaster: string | null,
    };
};

export default class CodenamesBoard extends React.Component<BoardProps, State> implements BaseBoard<State> {
    constructor(props: BoardProps) {
        super(props);
        this.state = {
            players: {
                red: ["Amol", "Anusha", "Bla Bla"],
                redCodemaster: "Reddy",
                blue: ["John", "Oliver", "Stephen Colbert"],
                blueCodemaster: "Bluey",
            }
        };
    }

    updateBoard(state: State) {
        this.setState(state);
    }

    updatePlayers(players: string[]) {
        // this.setState({ players });
    }

    renderPlayerSelection() {
        const renderPlayerList = (team: string) => {
            const teamName = (team == "red" ? "Red" : "Blue") + " Team";
            const players = (team === "red" ? this.state.players.red : this.state.players.blue);
            const codemaster = (team === "red" ? this.state.players.redCodemaster : this.state.players.blueCodemaster);

            return <View style={EStyleSheet.create({
                flex: 3,
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                borderRadius: "30rem",
                margin: "2%",
                padding: "2%",
            })}>
                <Text style={EStyleSheet.create({
                    textAlign: "center",
                    color: team,
                    fontSize: "30rem",
                    textShadowColor: "white",
                    textShadowRadius: "3rem",
                    paddingVertical: "2%",
                })}>{teamName}</Text>
                <Text style={EStyleSheet.create({
                    fontSize: "20rem",
                })}>Codemaster: {codemaster}</Text>
                {players.map(playerName => <Text style={EStyleSheet.create({
                    fontSize: "20rem",
                })}>{playerName}</Text>)}
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
