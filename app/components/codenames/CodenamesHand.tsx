import React from 'react';
import { SafeAreaView, View, StyleProp, ViewStyle, GestureResponderEvent, Text, TouchableOpacity } from 'react-native';
import BaseHand, { HandProps } from '../BaseHand';
import EStyleSheet from "react-native-extended-stylesheet";
import styles from "./styles";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

type State = {
    players: {
        red: string[],
        redCodemaster: string | null,
        blue: string[],
        blueCodemaster: string | null,
    },
    buttons: [string, string, boolean][],
};


export const Button: React.FunctionComponent<{ style?: StyleProp<ViewStyle>, flip?: boolean, title: string, disabled?: boolean, onPress?: (event: GestureResponderEvent) => void; }> = (props) => {
    const RootElement: React.FunctionComponent<{ style: StyleProp<ViewStyle>; }> = (rootProps) => {
        return !props.disabled ?
            <TouchableOpacity style={rootProps.style} onPress={props.onPress}>{rootProps.children}</TouchableOpacity> :
            <View style={rootProps.style}>{rootProps.children}</View>;
    };

    const fontSize = 64;

    return <RootElement
        style={[{
            backgroundColor: props.disabled ? "grey" : "red",
            display: "flex",
            borderRadius: 30,
            margin: 5,
            flex: 1,
        }]}
    >
        <Text style={{
            flex: 1,
            color: "white",
            fontWeight: "800",
            fontSize: 20,
            textAlign: "center",
            textAlignVertical: "center",
            borderWidth: 3,
            borderRadius: 12,
            padding: 2,
            borderColor: 'black',
        }}>
            {props.title}
        </Text>
    </RootElement>;
};

export default class CodenamesHand extends React.Component<HandProps, State> implements BaseHand<State> {
    constructor(props: HandProps) {
        super(props);
        this.state = {
            players: {
                red: ["Amol", "Anusha", "Bla Bla"],
                redCodemaster: "Reddy",
                blue: ["John", "Oliver", "Stephen Colbert"],
                blueCodemaster: "Bluey",
            },
            buttons: [
                ["Back", "back", true],
                ["Become Codemaster", "become-codemaster", true],
            ]
        };
    }

    updateHand(hand: any) {
        this.setState(hand);
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

        return [
            <View style={{ flex: 1 }}></View>,
            renderPlayerList("red"),
            renderPlayerList("blue"),
            <View style={{ flex: 1 }}></View>,
        ];
    }


    render() {
        return <SafeAreaView style={{
            flex: 1,
            backgroundColor: "#446983",
        }}>
            <View style={{ flex: 1, flexDirection: "column" }}>
                <View style={{ flex: 1, display: "flex" }}>
                    <View style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "row",
                        margin: hp("4%"),
                    }}>
                        {this.state.buttons.map(([title, action, enabled]) => {
                            return <Button title={title} onPress={() => { }} />;
                        })}
                    </View>
                </View>
                <View style={{ flex: 5, flexDirection: "row" }}>
                    {this.renderPlayerSelection()}
                </View>
            </View>
        </SafeAreaView>;
    }
}
