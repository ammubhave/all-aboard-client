import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableHighlight } from 'react-native';
import { ScreenOrientation } from 'expo';
import { getCardColor, getCardChar } from '../../components/sequence/constants';
import BaseHand, { HandProps } from '../BaseHand';


type Card = {
    color: string,
    prestige: number,
    cost: { white: number, black: number, red: number, blue: number, green: number }
}

type Noble = {
    cost: { color: string, count: number }[],
    prestige: number,
}

type HandCardInfo = {
    count: number,
    prestige: number,
};

type HandCards = {
    green: HandCardInfo,
    blue: HandCardInfo,
    red: HandCardInfo,
    white: HandCardInfo,
    black: HandCardInfo,
};

type HandCoins = {
    green: number,
    blue: number,
    red: number,
    white: number,
    black: number,
    gold: number,
};

type Hand = {
    handCards: HandCards,
    currentPlayerIndex: number,
    handCoins: HandCoins,
    reservedCards: Card[],
    nobles: Noble[],
}

type State = Hand;

export default class SplendorHand extends React.Component<HandProps, State> implements BaseHand<State> {
    constructor(props: HandProps) {
        super(props);

        this.state = {
            handCards: {
                green: {
                    count: 0,
                    prestige: 0,
                },
                blue: {
                    count: 0,
                    prestige: 0,
                },
                red: {
                    count: 0,
                    prestige: 0,
                },
                white: {
                    count: 0,
                    prestige: 0,
                },
                black: {
                    count: 0,
                    prestige: 0,
                },
            },
            currentPlayerIndex: -1,
            handCoins: {
                green: 0, blue: 0, red: 0, white: 0, black: 0, gold: 0
            },
            reservedCards: [{ color: "green", prestige: 3, cost: { white: 1, green: 1, blue: 2, red: 4, black: 0 } }]
        };
    }

    async componentDidMount() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }

    async componentWillUnmount() {
        await ScreenOrientation.unlockAsync();
    }

    updateHand(hand: Hand) {
        // this.setState(hand);
    }

    getBackgroundColor(color: string) {
        switch (color) {
            case 'white':
                return 'rgba(255,255,255,0.8)';
            case 'black':
                return 'rgba(20,20,20,1)';
            case 'red':
                return 'rgba(255,0,0,0.5)';
            case 'blue':
                return 'rgba(0,0,255,0.5)';
            case 'green':
                return 'rgba(0,128,0,0.5)';
            case 'gold':
                return 'rgba(255,215,0,0.5)';
        }
        return "";
    }

    onReservedCardPress = (reservedCardIndex: number) => {
        this.props.onAction(reservedCardIndex);
    }

    render() {
        const { handCards, currentPlayerIndex, handCoins, reservedCards } = this.state;
        while (reservedCards.length < 3) {
            reservedCards.push(null);
        }

        return <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, flexDirection: "row", display: "flex" }}>
                {Object.entries(handCards).sort().map(([color, card]) => {
                    let backgroundColor = color;
                    if (backgroundColor === "black") {
                        backgroundColor = "rgb(50,50,50)";
                    }

                    return <View style={{
                        flex: 1,
                        backgroundColor: backgroundColor,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#fff',
                    }}>
                        <View style={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                        }}>
                            <View style={{ flex: 1, backgroundColor: "rgba(255, 255, 255, 0.7)" }}>
                                <Text style={{ flex: 1, lineHeight: "60%", fontSize: 50, paddingLeft: "6%", color: "white", fontWeight: "800", textShadowRadius: 5, textShadowColor: "black" }}>
                                    {card.prestige}
                                </Text>
                            </View>
                            <View style={{ flex: 1, display: "flex", padding: "3%", backgroundColor: "rgba(0,0,0,0.3)" }}>
                                <Text style={{ flex: 1, lineHeight: "60%", textAlign: "right", fontSize: 50, paddingLeft: "6%", color: "white", fontWeight: "800", textShadowRadius: 5, textShadowColor: "black" }}>
                                    {card.count}
                                </Text>
                            </View>
                        </View>
                    </View>;
                })}
            </View>
            <View style={{ flex: 1, flexDirection: "row", display: "flex" }}>
                {Object.entries(handCoins).sort().map(([color, count]) => {
                    let backgroundColor = color;
                    if (backgroundColor === "black") {
                        backgroundColor = "rgb(50,50,50)";
                    }

                    return <View style={{
                        flex: 1,
                        backgroundColor: backgroundColor,
                        margin: 15,
                        borderRadius: "50%",
                        borderWidth: 5,
                        borderColor: 'black',
                    }}>
                        <View style={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                        }}>
                            <View style={{ flex: 1, backgroundColor: "rgba(255, 255, 255, 0.7)" }}>
                                <Text style={{ flex: 1, lineHeight: "75%", textAlign: "center", fontSize: 50, paddingLeft: "6%", color: "white", fontWeight: "800", textShadowRadius: 5, textShadowColor: "black" }}>
                                    {count}
                                </Text>
                            </View>
                        </View>
                    </View>;
                })}
            </View>
            <View style={{ flex: 1, flexDirection: "row", display: "flex" }}>
                <View style={{ flex: 2 }}>
                    <Text>Hello</Text>
                </View>
                {reservedCards.map((card, reservedCardIndex) => {
                    if (card === null) {
                        return <View style={{ flex: 1 }}></View>;
                    }
                    let backgroundColor = card.color;
                    if (backgroundColor === "black") {
                        backgroundColor = "rgb(50,50,50)";
                    }

                    return <TouchableHighlight style={{
                        flex: 1,
                        backgroundColor: backgroundColor,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#fff',
                    }}

                        onPress={() => this.onReservedCardPress(reservedCardIndex)}
                        underlayColor='#fff'>
                        <View style={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                        }}>
                            <View style={{ flex: 1, backgroundColor: "rgba(255, 255, 255, 0.7)" }}>
                                <Text style={{ flex: 1, lineHeight: "60%", fontSize: 50, paddingLeft: "6%", color: "white", fontWeight: "800", textShadowRadius: 5, textShadowColor: "black" }}>
                                    {card.prestige}
                                </Text>
                            </View>
                            <View style={{ flex: 1, display: "flex", padding: "3%", backgroundColor: "rgba(0,0,0,0.3)", flexDirection: "row" }}>
                                {Object.entries(card.cost).sort().map(([color, count]) => {
                                    if (count === 0) {
                                        return;
                                    }
                                    const backgroundColor = this.getBackgroundColor(color);

                                    let forecolor = "white";
                                    if (color === "white") {
                                        forecolor = "black";
                                    }

                                    return <View style={{
                                        flex: 1,
                                        borderRadius: "50%",
                                        backgroundColor: backgroundColor,
                                    }}>
                                        <Text style={{ flex: 1, textAlign: "center", lineHeight: "55%", fontSize: 30, fontWeight: "300", color: forecolor }}>{count}</Text>
                                    </View>;
                                })}
                            </View>
                        </View>
                    </TouchableHighlight>;
                })}
            </View>
        </SafeAreaView>
    }
}
