import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, ViewProps, ImageBackground, StyleProp, ViewStyle, GestureResponderEvent } from 'react-native';
import Button from '../Button';
import BaseGameScreen, { GameScreenProps } from "../BaseGameScreen";
import { ScreenOrientation } from "expo";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { TouchableOpacity } from "react-native-gesture-handler";

type BoardCell = {
    kind: string,
    color?: string,
    value?: string,
    isSelectable?: boolean,
};

type State = {
    players: {
        red: string[],
        redCodemaster: string | null,
        blue: string[],
        blueCodemaster: string | null,
    },
    buttons: [string, string, boolean][],
    playerNameDisplay: string,
    displayText: string,
    status: "player-selection" | "board" | "none" | "game-over",
    board: BoardCell[][],
};

export default class CodenamesScreen extends React.Component<GameScreenProps, State> implements BaseGameScreen<State> {
    constructor(props: GameScreenProps) {
        super(props);

        this.state = {
            players: {
                red: [],
                redCodemaster: undefined,
                blue: [],
                blueCodemaster: undefined,
            },
            buttons: [],
            playerNameDisplay: null,
            displayText: "Connecting to server...",
            status: "none",
            board: [],
        };
    }

    async componentDidMount() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }

    async componentWillUnmount() {
        await ScreenOrientation.unlockAsync();
    }

    updateScreen(content: any) {
        this.setState(content);
    }

    renderPlayerSelection() {
        const renderPlayerList = (team: string) => {
            const teamName = (team == "red" ? "Red" : "Blue") + " Team";
            const players = (team === "red" ? this.state.players.red : this.state.players.blue);
            const codemaster = (team === "red" ? this.state.players.redCodemaster : this.state.players.blueCodemaster);

            return <View style={{
                flex: 3,
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                borderRadius: 30,
                margin: "2%",
                padding: "2%",
            }}>
                <Text style={{
                    textAlign: "center",
                    color: team,
                    fontSize: 30,
                    textShadowColor: "white",
                    textShadowRadius: 3,
                    paddingVertical: "2%",
                }}>{teamName}</Text>
                <View style={{
                    marginVertical: 8,
                    borderBottomColor: '#737373',
                    borderBottomWidth: 1,
                }} />
                <Text style={{
                    fontSize: 20,
                    color: "white",
                }}>Codemaster: {codemaster}</Text>
                <View style={{
                    marginVertical: 8,
                    borderBottomColor: '#737373',
                    borderBottomWidth: 1,
                }} />
                {players.map(playerName => <Text style={{
                    fontSize: 20,
                    color: "white",
                }}>{playerName}</Text>)}
            </View>;
        };

        return [
            renderPlayerList("red"),
            renderPlayerList("blue"),
        ];
    }

    renderBoard() {
        const { width, height } = Dimensions.get('window');

        // Use iPhone6 as base size which is 375 x 667
        const baseWidth = 375;
        const baseHeight = 667;

        const scaleWidth = width / baseWidth;
        const scaleHeight = height / baseHeight;
        const scale = Math.min(scaleWidth, scaleHeight);

        const scaledSize =
            (size) => Math.ceil((size * scale));

        const AspectView: React.FunctionComponent<ViewProps & { isSelectable?: boolean; onPress?: (event: GestureResponderEvent) => void; }> = (props) => {
            const [layout, setLayout] = React.useState(null);

            const { aspectRatio = 1, ...inputStyle } =
                StyleSheet.flatten(props.style) || {};
            const style = [inputStyle, { aspectRatio }];

            if (layout) {
                const { width = 0, height = 0 } = layout;
                style.push({ width: height * aspectRatio, height });
            }

            return (
                <TouchableOpacity
                    {...props}
                    disabled={!props.isSelectable}
                    onPress={props.onPress}
                    style={[{
                        height: hp(15),
                        width: hp((500.0 / 345.0) * 14),
                    }, style]}
                    onLayout={({ nativeEvent: { layout } }) => { setLayout(layout); console.log(layout); }}
                >{props.children}</TouchableOpacity>
            );
        };

        const renderRow = (row, rowIndex) => {
            return <View style={{
                flex: 1,
                flexDirection: "row"
            }}>
                {row.map((cell, colIndex) => {
                    const backgroundColor = (cell.kind === "word" ? "#cebc9c" : "black");

                    return <View style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <View style={{ flex: 1, marginVertical: hp(0.4), marginHorizontal: wp(0.4) }}>
                            <AspectView style={{
                                backgroundColor,
                                borderColor: cell.color,
                                shadowColor: cell.color,
                                shadowOpacity: 1,
                                shadowOffset: { width: 0, height: 0 },
                                shadowRadius: 10,
                                borderWidth: wp(0.25),
                                aspectRatio: 500.0 / 345.0,
                                flex: 1,
                                borderRadius: wp(0.5)
                            }} isSelectable={cell.isSelectable}
                                onPress={() => {
                                    this.props.onAction({ "type": "card", "rowIndex": rowIndex, "colIndex": colIndex });
                                }}>
                                {
                                    (() => {
                                        switch (cell.kind) {
                                            case 'word':
                                                return <View style={{
                                                    flex: 1,
                                                    margin: wp(0.4),
                                                    borderColor: "#b3956d",
                                                    borderWidth: wp(0.15),
                                                    backgroundColor: "#d0b694",
                                                    borderRadius: wp(0.1),
                                                    flexDirection: "column",
                                                }}>
                                                    <View style={{
                                                        flex: 1,
                                                    }}>
                                                        <View style={{
                                                            flex: 1,
                                                            marginHorizontal: wp(0.2),
                                                            borderBottomColor: "#b3956d",
                                                            borderBottomWidth: wp(0.15),
                                                        }}>
                                                            <Text style={{
                                                                flex: 1,
                                                                color: "#746653",
                                                                textAlign: "right",
                                                                marginLeft: "15%",
                                                                fontSize: scaledSize(11),
                                                                fontStyle: "italic",
                                                                fontWeight: "800",
                                                                transform: [{ rotateZ: "180deg" }]
                                                            }}
                                                            >{cell.value}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{
                                                        flex: 1,
                                                    }}>
                                                        <View style={{
                                                            flex: 1,
                                                            alignItems: "center",
                                                            flexDirection: "row",
                                                            margin: wp(0.4),
                                                            borderBottomLeftRadius: wp(0.5),
                                                            borderBottomRightRadius: wp(0.5),
                                                            backgroundColor: "white",
                                                        }}>
                                                            <Text style={{
                                                                flex: 1,
                                                                textAlign: "center",
                                                                fontSize: scaledSize(14),
                                                                fontWeight: "800",
                                                            }}
                                                            >{cell.value}</Text>
                                                        </View>

                                                    </View>
                                                </View>;
                                            case 'bystander':
                                                return <View style={{
                                                    flex: 1,
                                                    borderColor: "#b3956d",
                                                    borderWidth: wp(0.15),
                                                    borderRadius: wp(0.1),
                                                }}>
                                                    <ImageBackground source={require('./assets/bystander.jpg')} style={{ width: "100%", height: "100%" }}></ImageBackground>
                                                </View>;
                                            case 'agent-red':
                                                return <View style={{
                                                    flex: 1,
                                                    borderColor: "red",
                                                    borderWidth: wp(0.15),
                                                    borderRadius: wp(0.1),
                                                }}>
                                                    <ImageBackground source={require('./assets/agent-red.jpg')} style={{ width: "100%", height: "100%" }}></ImageBackground>
                                                </View>;
                                            case 'agent-blue':
                                                return <View style={{
                                                    flex: 1,
                                                    borderColor: "blue",
                                                    borderWidth: wp(0.15),
                                                    borderRadius: wp(0.1),
                                                }}>
                                                    <ImageBackground source={require('./assets/agent-blue.jpg')} style={{ width: "100%", height: "100%" }}></ImageBackground>
                                                </View>;
                                            case 'assasin':
                                                return <View style={{
                                                    flex: 1,
                                                    borderColor: "black",
                                                    borderWidth: wp(0.15),
                                                    borderRadius: wp(0.1),
                                                }}>
                                                    <ImageBackground source={require('./assets/assasin.jpg')} style={{ width: "100%", height: "100%" }}></ImageBackground>
                                                </View>;
                                        }
                                    })()
                                }
                            </AspectView>
                        </View>
                    </View>;
                })}
            </View>;
        };

        return <View style={{
            flex: 1,
            flexDirection: "column",
            backgroundColor: "#817264",
            margin: 20,
            marginVertical: 5,
            padding: 10,
            // aspectRatio: 1,
            // width: 0,
        }}>
            {this.state.board.map(renderRow)}
        </View>;
    }

    render() {
        return <SafeAreaView style={{
            flex: 1,
            backgroundColor: "#446983",
        }}>
            <View style={{ flex: 1, flexDirection: "column" }}>
                <View style={{ flex: 2, flexDirection: "row", alignItems: "center" }}>
                    {this.state.buttons.map(([title, action, enabled]) => {
                        return <Button title={title} disabled={!enabled} onPress={() => {
                            if (action === "back") {
                                this.props.onBack();
                            } else {
                                this.props.onAction({ "type": action });
                            }
                        }} />;
                    })}
                </View>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                    {this.state.playerNameDisplay && <Text style={{
                        flex: 1,
                        textAlign: "center",
                        color: "white",
                        fontSize: Dimensions.get("window").width * 0.02,
                    }}>{this.state.playerNameDisplay}</Text>}
                    <Text style={{
                        flex: 1,
                        textAlign: "center",
                        color: "white",
                        fontSize: Dimensions.get("window").width * 0.02,
                    }}>{this.state.displayText}</Text>
                </View>
                <View style={{ flex: 14, flexDirection: "row" }}>
                    {
                        (() => {
                            switch (this.state.status) {
                                case "player-selection":
                                    return this.renderPlayerSelection();
                                case "board":
                                case "game-over":
                                    return this.renderBoard();
                                case "none":
                                    return [];
                            }
                        })()
                    }
                </View>
            </View>
        </SafeAreaView>;
    }
}
