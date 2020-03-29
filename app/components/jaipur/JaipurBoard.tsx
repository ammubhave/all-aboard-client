import React, { Component } from 'react';
import { View, Text, SafeAreaView, Image, StyleProp, ViewStyle, ImageStyle, ImageBackground, Dimensions, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { ScreenOrientation } from 'expo';

import BaseBoard, { BoardProps } from '../BaseBoard';
import styles, { HEIGHT, WIDTH } from './styles';
import { fontSize } from '../../styles/theme';
import { Card, Coin, Token, Button } from './utils';
import renderBoardMat from './renderBoardMat';

type PlayerState = {
    sealsOfExcellence: number,
    camels: number,
    hasCamelToken: boolean,
    rupees: number,
    goodsTokens: {
        diamond: number[],
        gold: number[],
        silver: number[],
        cloth: number[],
        spice: number[],
        leather: number[],
    },
    bonusTokens: {
        bonus_3: number[],
        bonus_4: number[],
        bonus_5: number[],
    },
};
type State = {
    playerStates: [PlayerState, PlayerState],
    market: [string, string, string, string, string],
    marketIsSelected: [boolean, boolean, boolean, boolean, boolean],
    marketIsSelectable: [boolean, boolean, boolean, boolean, boolean],
    topDiscard: string,
    drawPileHasCards: boolean,
    goodsTokens: {
        diamond: number[],
        gold: number[],
        silver: number[],
        cloth: number[],
        spice: number[],
        leather: number[],
    },
    bonusTokens: {
        bonus_3: number,
        bonus_4: number,
        bonus_5: number,
    },
    camelToken: boolean,
    currentPlayerIndex: number,
    buttons: [string, string, boolean][],

    players: string[],
};

export default class JaipurBoard extends React.Component<BoardProps, State> implements BaseBoard<State> {
    goodsTokenTrackTop: number;
    goodsTokenTrackBottom: number;
    bonusTokenTrackTop: number;
    bonusTokenTrackBottom: number;

    constructor(props: BoardProps) {
        super(props);

        this.goodsTokenTrackTop = 20;
        this.goodsTokenTrackBottom = 76.7;
        this.bonusTokenTrackTop = 30;
        this.bonusTokenTrackBottom = 67;

        // this.state = {
        //     playerStates: [
        //         {
        //             sealsOfExcellence: 2,
        //             camels: 4,
        //             hasCamelToken: true,
        //             rupees: 0,
        //             goodsTokens: {
        //                 diamond: [7],
        //                 gold: [6],
        //                 silver: [5],
        //                 cloth: [1, 2, 2, 3, 3, 5],
        //                 spice: [1, 2, 2, 3, 3, 5],
        //                 leather: [1, 1, 1, 1, 1, 2, 3, 4],
        //             },
        //             bonusTokens: {
        //                 bonus_3: [4, 5, 6],
        //                 bonus_4: [],
        //                 bonus_5: [],
        //             }
        //         },
        //         {
        //             sealsOfExcellence: 2,
        //             camels: 5,
        //             hasCamelToken: true,
        //             rupees: 0,
        //             goodsTokens: {
        //                 diamond: [7],
        //                 gold: [6],
        //                 silver: [5],
        //                 cloth: [1, 2, 2, 3, 3, 5],
        //                 spice: [1, 2, 2, 3, 3, 5],
        //                 leather: [1, 1, 1, 1, 1, 2, 3, 4],
        //             },
        //             bonusTokens: {
        //                 bonus_3: [4, 5, 6],
        //                 bonus_4: [],
        //                 bonus_5: [],
        //             }
        //         }
        //     ],
        //     market: ["diamond", "silver", "cloth", "leather", "spice"],
        //     marketIsSelected: [true, true, false, false, false],
        //     marketIsSelectable: [true, true, true, true, true],
        //     topDiscard: "gold",
        //     drawPileHasCards: true,
        //     goodsTokens: {
        //         diamond: [5, 5, 5, 7, 7],
        //         gold: [5, 5, 5, 6, 6],
        //         silver: [5, 5, 5, 5, 5],
        //         cloth: [1, 1, 2, 2, 3, 3, 5],
        //         spice: [1, 1, 2, 2, 3, 3, 5],
        //         leather: [1, 1, 1, 1, 1, 1, 2, 3, 4],
        //     },
        //     bonusTokens: {
        //         bonus_3: 6,
        //         bonus_4: 6,
        //         bonus_5: 6,
        //     },
        //     camelToken: true,
        //     currentPlayerIndex: -1,
        //     buttons: [["start", "Start Game"]],
        // };

        this.state = {
            playerStates: [
                {
                    sealsOfExcellence: 0,
                    camels: 0,
                    hasCamelToken: false,
                    rupees: 0,
                    goodsTokens: {
                        diamond: [],
                        gold: [],
                        silver: [],
                        cloth: [],
                        spice: [],
                        leather: [],
                    },
                    bonusTokens: {
                        bonus_3: [],
                        bonus_4: [],
                        bonus_5: [],
                    }
                },
                {
                    sealsOfExcellence: 0,
                    camels: 0,
                    hasCamelToken: false,
                    rupees: 0,
                    goodsTokens: {
                        diamond: [],
                        gold: [],
                        silver: [],
                        cloth: [],
                        spice: [],
                        leather: [],
                    },
                    bonusTokens: {
                        bonus_3: [],
                        bonus_4: [],
                        bonus_5: [],
                    }
                },
            ],
            market: [null, null, null, null, null],
            marketIsSelected: [false, false, false, false, false],
            marketIsSelectable: [false, false, false, false, false],
            topDiscard: null,
            drawPileHasCards: false,
            goodsTokens: {
                diamond: [],
                gold: [],
                silver: [],
                cloth: [],
                spice: [],
                leather: [],
            },
            bonusTokens: {
                bonus_3: 0,
                bonus_4: 0,
                bonus_5: 0,
            },
            camelToken: false,
            currentPlayerIndex: -1,
            buttons: [["start", "Start Game", false]],

            players: [],
        };
    }

    updateBoard(state: State) {
        this.setState(state);
    }

    updatePlayers(players: string[]) {
        this.setState({ players });
    }

    render() {
        const goodsTokenTrackTop = this.goodsTokenTrackTop;
        const goodsTokenTrackBottom = this.goodsTokenTrackBottom;
        const bonusTokenTrackTop = this.bonusTokenTrackTop;
        const bonusTokenTrackBottom = this.bonusTokenTrackBottom;

        const goodsTokenTrackOffsets = 1.38;

        return <SafeAreaView style={styles.mat}>
            {renderBoardMat()}

            <View style={{ position: "absolute", top: "50%", transform: [{ rotateZ: "-90deg" }], left: "-7.5%", flexDirection: "row", width: "20%" }}>
                <Button title="Back" onPress={() => {
                    this.props.onBack();
                }} />
                <Button title="Reset" onPress={() => {
                    this.props.onAction({ "type": "reset" });
                }} />
            </View>

            {this.state.playerStates[0].sealsOfExcellence >= 1 && <Token type='seal_of_excellence' top={4.7} left={47.5} flip />}
            {this.state.playerStates[0].sealsOfExcellence >= 2 && <Token type='seal_of_excellence' top={4.7} left={55.5} flip />}
            {this.state.playerStates[1].sealsOfExcellence >= 1 && <Token type='seal_of_excellence' bottom={4.7} left={47.5} />}
            {this.state.playerStates[1].sealsOfExcellence >= 2 && <Token type='seal_of_excellence' bottom={4.7} left={55.5} />}

            {this.state.playerStates[0].hasCamelToken && <Token type='camel' top={4.7} left={39.5} flip />}
            {this.state.playerStates[1].hasCamelToken && <Token type='camel' bottom={4.7} left={39.5} />}

            {([
                ['diamond', this.state.goodsTokens.diamond],
                ['gold', this.state.goodsTokens.gold],
                ['silver', this.state.goodsTokens.silver],
                ['cloth', this.state.goodsTokens.cloth],
                ['spice', this.state.goodsTokens.spice],
                ['leather', this.state.goodsTokens.leather],
            ] as [string, number[]][]).map(([type, tokens], i) =>
                tokens.map((value, j) =>
                    <Token type={type} value={value} top={goodsTokenTrackTop + i * (goodsTokenTrackBottom - goodsTokenTrackTop) / 5} left={84 - j * goodsTokenTrackOffsets} />))}

            {this.state.drawPileHasCards && <Card type='cover' bottom={30} left={5} />}

            {this.state.topDiscard !== null && <Card type={this.state.topDiscard} top={30} left={5} />}

            {this.state.playerStates[0].camels > 0 && <Card type='camel' count={this.state.playerStates[0].camels} left={17} top={5} flip />}
            {this.state.playerStates[1].camels > 0 && <Card type='camel' count={this.state.playerStates[1].camels} left={17} bottom={5} />}

            {this.state.market.map((card, i) => card && <Card left={17 + 11 * i} top={42} type={card} selected={this.state.marketIsSelected[i]} isSelectable={this.state.marketIsSelectable[i]} onPress={() => this.props.onAction({ type: "select-card", index: i })} />)}

            {new Array(this.state.bonusTokens.bonus_3).fill(null).map((_, i) => <Token type={"bonus_3"} top={bonusTokenTrackTop + 0.6 * i} right={3} />)}
            {new Array(this.state.bonusTokens.bonus_4).fill(null).map((_, i) => <Token type={"bonus_4"} top={bonusTokenTrackTop + (bonusTokenTrackBottom - bonusTokenTrackTop) / 3 + 0.6 * i} right={3} />)}
            {new Array(this.state.bonusTokens.bonus_5).fill(null).map((_, i) => <Token type={"bonus_5"} top={bonusTokenTrackTop + 2 * (bonusTokenTrackBottom - bonusTokenTrackTop) / 3 + 0.6 * i} right={3} />)}
            {this.state.camelToken && <Token type={"camel"} top={bonusTokenTrackTop + 3 * (bonusTokenTrackBottom - bonusTokenTrackTop) / 3} right={3} />}

            <Coin top={3.5} right={2} value={this.state.playerStates[0].rupees} flip />
            <Coin bottom={3.5} right={2} value={this.state.playerStates[1].rupees} />

            {[0, 1].map(playerIndex => {
                return [...this.state.playerStates[playerIndex].goodsTokens.diamond.map(value => { return { type: "diamond", value }; }),
                ...this.state.playerStates[playerIndex].goodsTokens.gold.map(value => { return { type: "gold", value }; }),
                ...this.state.playerStates[playerIndex].goodsTokens.silver.map(value => { return { type: "silver", value }; }),
                ...this.state.playerStates[playerIndex].goodsTokens.cloth.map(value => { return { type: "cloth", value }; }),
                ...this.state.playerStates[playerIndex].goodsTokens.spice.map(value => { return { type: "spice", value }; }),
                ...this.state.playerStates[playerIndex].goodsTokens.leather.map(value => { return { type: "leather", value }; }),
                ...this.state.playerStates[playerIndex].bonusTokens.bonus_3.map(value => { return { type: "coin", value }; }),
                ...this.state.playerStates[playerIndex].bonusTokens.bonus_4.map(value => { return { type: "coin", value }; }),
                ...this.state.playerStates[playerIndex].bonusTokens.bonus_5.map(value => { return { type: "coin", value }; }),
                ].map(({ type, value }, i) => {
                    if (playerIndex === 0)
                        return <Token type={type} value={value} top={4.7} left={83 - i * 0.8} flip />;
                    else
                        return <Token type={type} value={value} bottom={4.7} left={83 - i * 0.8} />;
                });
            })}

            {
                [0, 1].map(i => {
                    const getButton = () => {
                        if (this.state.currentPlayerIndex !== -1 && this.state.currentPlayerIndex !== i) {
                            return;
                        }
                        return this.state.buttons.map(([action, title, disabled]) => {
                            if (action === "start" && this.state.players.length !== 2)
                                disabled = true;
                            if (action === "start" && this.state.players.length > i) {
                                title = title + " (" + this.state.players[i] + ")";
                            }
                            return <Button title={title} disabled={disabled} onPress={() => {
                                if (action === "start") {
                                    this.props.onStart();
                                } else {
                                    this.props.onAction({ "type": action });
                                }
                            }} />;
                        });
                    };

                    return <View style={[styles.buttonPanel, i == 0 ? { bottom: "68%", transform: [{ rotateX: "180deg" }, { rotateY: "180deg" }] } : { top: "68%" }]}>
                        {getButton()}
                    </View>;
                })
            }
        </SafeAreaView>;
    }
};
