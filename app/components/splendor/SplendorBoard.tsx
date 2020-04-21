import React from 'react';
import { View, Text, SafeAreaView, ImageBackground, GestureResponderEvent, TouchableOpacity, StyleProp, ViewStyle, Image } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Button from '../Button';

type CardColor = "black" | "blue" | "green" | "red" | "white";
type CoinColor = CardColor | "gold";
type CardCost = { black?: number, blue?: number, green?: number, red?: number, white?: number; };
export type CardInfo = {
    color: CardColor,
    prestige: number,
    cost: CardCost,
    isSelectable?: boolean,
};
type NobleInfo = {
    cost: { color: CardColor, count: number; }[],
    prestige: number,
    nobleIndex: number,
    isSelectable?: boolean,
};

type Props = {
    onAction(action: any): Promise<void>;
    onBack(): void;
};

type State = {
    buttons: [string, string, boolean][],
    faceupCards: CardInfo[][],
    coins: { white: number, black: number, red: number, blue: number, green: number, gold: number; },
    coinsSelectable: { white: boolean, black: boolean, red: boolean, blue: boolean, green: boolean, gold: boolean; },
    pilesSelectable: [boolean, boolean, boolean],
    pilesVisible: [boolean, boolean, boolean],
    nobles: NobleInfo[],
    displayText: string,
    playerStates: {
        name: string,
        isTurn: boolean,
        coins: { white: number, black: number, red: number, blue: number, green: number, gold: number; },
        coinsSelectable: boolean,
        prestige: number,
        reservedCards: number[],
        cards: { white: number, black: number, red: number, blue: number, green: number },
    }[]
};

const colorToCardImage = (color: CardColor) => {
    switch (color) {
        case "black": return require('./black_card1.png');
        case "blue": return require('./blue_card1.png');
        case "green": return require('./green_card1.png');
        case "red": return require('./red_card1.png');
        case "white": return require('./white_card1.png');
    }
};

const colorToGemImage = (color: CoinColor) => {
    switch (color) {
        case "black": return require('./black_gem.png');
        case "blue": return require('./blue_gem.png');
        case "green": return require('./green_gem.png');
        case "red": return require('./red_gem.png');
        case "white": return require('./white_gem.png');
        case "gold": return require('./gold_gem.png');
    }
};

const colorToCostImage = (color: CardColor) => {
    switch (color) {
        case "black": return require('./black_cost.png');
        case "blue": return require('./blue_cost.png');
        case "green": return require('./green_cost.png');
        case "red": return require('./red_cost.png');
        case "white": return require('./white_cost.png');
    }
};

const backToCardImage = (level: number) => {
    switch (level) {
        case 1: return require('./back_card1.png');
        case 2: return require('./back_card2.png');
        case 3: return require('./back_card3.png');
    }
};

export const Card: React.FunctionComponent<{
    isSelectable?: boolean,
    onPress?: (event: GestureResponderEvent) => void,
    color?: CardColor,
    prestige?: number,
    cost?: CardCost,
    style?: StyleProp<ViewStyle>,
    scale?: number,
    count?: number,
}> = (props) => {
    const cardHeight = hp(15) * (props.scale || 1);
    const aspectRatio = 0.7;
    const gemScale = 0.2;
    const costCountScale = 0.16;

    const cardContents = (() => {
        if (props.color) {
            return <ImageBackground style={{
                flex: 1,
                flexDirection: "column",
            }} source={colorToCardImage(props.color)}>
                <View style={{ flex: 1, backgroundColor: "rgba(255, 255, 255, 0.6)", flexDirection: "row", alignItems: "center" }}>
                    <Text style={{
                        fontSize: cardHeight * 0.2,
                        paddingLeft: "6%",
                        color: "white",
                        fontWeight: "800",
                        textShadowRadius: cardHeight * 0.01,
                        textShadowColor: "black",
                        textShadowOffset: { width: 0, height: 0 },
                        flex: 1,
                    }}>
                        {props.prestige}
                    </Text>
                    <Image
                        source={colorToGemImage(props.color)}
                        style={{
                            height: cardHeight * gemScale,
                            width: cardHeight * gemScale,
                            resizeMode: "stretch",
                            marginRight: cardHeight * 0.04,
                            shadowColor: "black",
                            shadowOpacity: 1,
                            overflow: "visible",
                            shadowOffset: { width: -1, height: 2 }
                        }} />
                </View>
                {props.cost &&
                    <View style={{ flex: 3, padding: cardHeight * 0.03 }}>
                        <View style={{ flex: 0.2 }}></View>
                        {new Array(Object.entries(props.cost || {}).filter(val => val[1] === 0).length + (5 - Object.entries(props.cost || {}).length) - 1).fill(null).map(_ => <View style={{
                            flex: 1,
                        }} />)}

                        {[["white", props.cost?.white || 0],
                        ["blue", props.cost?.blue || 0],
                        ["green", props.cost?.green || 0],
                        ["red", props.cost?.red || 0],
                        ["black", props.cost?.black || 0]].map(([color, count]: [CardColor, number]) => {
                            if (count === 0) return;
                            return <View style={{ flex: 1 }}>
                                <ImageBackground style={{
                                    borderRadius: cardHeight * costCountScale / 2,
                                    height: cardHeight * costCountScale,
                                    width: cardHeight * costCountScale,
                                    flexDirection: "row",
                                    alignItems: "center",
                                }} source={colorToCostImage(color)} resizeMethod="scale">
                                    <Text style={{
                                        textAlign: "center",
                                        fontSize: cardHeight * 0.12,
                                        fontWeight: "800",
                                        color: "white",
                                        textShadowRadius: cardHeight * 0.01,
                                        textShadowColor: "black",
                                        textShadowOffset: { width: 0, height: 0 },
                                        flex: 1,
                                    }}>
                                        {count}
                                    </Text>
                                </ImageBackground>
                            </View>;
                        })}
                    </View>
                }
                {props.count !== undefined &&
                    <View style={{ flex: 3, padding: cardHeight * 0.03 }}>
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                            <Text style={{
                                textAlign: "center",
                                backgroundColor: "black",
                                borderRadius: cardHeight * 0.25,
                                overflow: "hidden",
                                fontSize: cardHeight * 0.4,
                                fontWeight: "800",
                                color: "white",
                                textShadowRadius: cardHeight * 0.01,
                                textShadowColor: "black",
                                textShadowOffset: { width: 0, height: 0 },
                                flex: 1,
                            }}>
                                {props.count}
                            </Text>
                        </View>
                    </View>
                }
            </ImageBackground>;
        } else {
            return <View style={{ flex: 1, marginHorizontal: cardHeight * 0.03, marginVertical: cardHeight * 0.03, borderRadius: cardHeight * 0.04, overflow: "hidden" }}>
                <ImageBackground style={{ flex: 1, padding: 10 }} resizeMode="stretch" source={backToCardImage(props.prestige)} />
            </View>;
        }
    })();

    return <TouchableOpacity
        disabled={!props.isSelectable}
        onPress={props.onPress}
        style={[{
            height: cardHeight,
            width: cardHeight * aspectRatio,
            borderRadius: cardHeight * 0.05,
            borderWidth: 1,
            borderColor: 'white',
            backgroundColor: 'white',
        }, props.style, props.isSelectable && {
            shadowColor: "white",
            shadowRadius: cardHeight * 0.1,
            shadowOpacity: 1,
            shadowOffset: { width: 0, height: 0 },
        }]}>
        <View style={{
            flex: 1, overflow: "hidden",
            borderRadius: cardHeight * 0.05,
        }}>{cardContents}</View>
    </TouchableOpacity >;
};


const Coin: React.FunctionComponent<{
    isSelectable?: boolean,
    onPress?: (event: GestureResponderEvent) => void,
    color?: CoinColor,
    count?: number,
    scale?: number,
}> = (props) => {
    const coinHeight = hp(6) * (props.scale || 1);
    return <TouchableOpacity
        disabled={!props.isSelectable}
        onPress={props.onPress}
        style={[{
            height: coinHeight,
            width: coinHeight,
            borderRadius: coinHeight / 2,
            backgroundColor: props.color,
            borderColor: "#cea56e",
            borderWidth: coinHeight * 0.02,
        }, props.isSelectable && {
            shadowColor: "white",
            shadowRadius: coinHeight * 0.2,
            shadowOpacity: 1,
            shadowOffset: { width: 0, height: 0 },
        }]}><View style={{ flex: 1, borderRadius: coinHeight / 2, overflow: "hidden" }}>
            <ImageBackground
                style={{
                    backgroundColor: "#cea56e",
                    flex: 1,
                    margin: coinHeight * 0.1,
                    borderRadius: coinHeight / 2,
                    overflow: "hidden",
                }}
                source={colorToGemImage(props.color)}
                imageStyle={{
                    margin: coinHeight * 0.1,
                }}>
                <View style={{ flex: 1, alignItems: "center", flexDirection: "row", backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <Text style={{
                        flex: 1,
                        textAlign: "center",
                        fontSize: coinHeight * 0.5,
                        fontWeight: "800",
                        color: "white",
                        textShadowRadius: coinHeight * 0.01,
                        textShadowColor: "black",
                        textShadowOffset: { width: 0, height: 0 },
                    }}>
                        {props.count}
                    </Text>
                </View>
            </ImageBackground>
        </View>
    </TouchableOpacity>;
};

const Noble: React.FunctionComponent<{
    isSelectable?: boolean,
    onPress?: (event: GestureResponderEvent) => void,
    cost: { color: CardColor, count: number; }[],
    prestige: number,
    nobleIndex: number,
    style?: StyleProp<ViewStyle>,
    scale?: number,
}> = (props) => {
    const nobleIndexToNobleImage = (index: number) => {
        switch (index) {
            case 1: return require('./noble1.jpg');
            case 2: return require('./noble2.jpg');
            case 3: return require('./noble3.jpg');
            case 4: return require('./noble4.jpg');
            case 5: return require('./noble5.jpg');
            case 6: return require('./noble6.jpg');
            case 7: return require('./noble7.jpg');
            case 8: return require('./noble8.jpg');
            case 9: return require('./noble9.jpg');
            case 10: return require('./noble10.jpg');
        }
    };

    const cardHeight = hp(8) * (props.scale || 1);

    return <TouchableOpacity
        disabled={!props.isSelectable}
        onPress={props.onPress}
        style={[{
            height: cardHeight,
            width: cardHeight,
            borderRadius: cardHeight * 0.05,
            borderWidth: 1,
            borderColor: 'white',
            backgroundColor: 'white',
        }, props.style, props.isSelectable && {
            shadowColor: "white",
            shadowRadius: cardHeight * 0.1,
            shadowOpacity: 1,
            shadowOffset: { width: 0, height: 0 },
        }]}><View style={{ flex: 1, overflow: "hidden", borderRadius: cardHeight * 0.05, }}>
            <ImageBackground
                style={{
                    backgroundColor: "#cea56e",
                    flex: 1,
                    overflow: "hidden",
                    flexDirection: "row"
                }}
                source={nobleIndexToNobleImage(props.nobleIndex)}>
                <View style={{ flex: 1, flexDirection: "column", alignItems: "center", backgroundColor: "rgba(255, 255, 255, 0.7)" }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                        <Text style={{
                            textAlign: "center",
                            fontSize: cardHeight * 0.25,
                            color: "white",
                            fontWeight: "800",
                            textShadowRadius: cardHeight * 0.01,
                            textShadowColor: "black",
                            textShadowOffset: { width: 0, height: 0 },
                            flex: 1,
                        }}>
                            {props.prestige}
                        </Text>
                    </View>

                    {props.cost.map(({ color, count }) => {
                        if (count === 0) return;
                        return <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                            <ImageBackground style={{
                                height: cardHeight * 0.2,
                                width: cardHeight * 0.2 * 0.7,
                                flexDirection: "row",
                                alignItems: "center",
                                overflow: "hidden",
                            }} source={colorToCostImage(color)} resizeMethod="scale" imageStyle={{
                                height: cardHeight,
                                width: cardHeight,
                                top: -cardHeight / 2,
                                left: -cardHeight / 2,
                            }} >
                                <Text style={{
                                    textAlign: "center",
                                    fontSize: cardHeight * 0.12,
                                    fontWeight: "800",
                                    color: "white",
                                    textShadowRadius: cardHeight * 0.01,
                                    textShadowColor: "black",
                                    textShadowOffset: { width: 0, height: 0 },
                                    flex: 1,
                                }}>
                                    {count}
                                </Text>
                            </ImageBackground>
                        </View>;
                    })}
                </View>
                <View style={{ flex: 3, backgroundColor: "rgba(128, 128, 128, 0.3)" }}></View>
            </ImageBackground>
        </View>
    </TouchableOpacity>;
};

const PlayerArea: React.FunctionComponent<{
    coins: { white: number, black: number, red: number, blue: number, green: number, gold: number; },
    coinsSelectable?: boolean,
    side: "left" | "bottom" | "right",
    name?: string,
    isTurn?: boolean,
    cards?: {
        blue?: number,
        red?: number,
        green?: number,
        white?: number,
        black?: number,
    },
    reservedCards?: number[],
    prestige?: number,
    onCoinPress?: any,
}> = (props) => {
    const scale = 1.2;
    const areaWidth = Math.min(wp(40), hp(60)) * scale;
    return <View style={{ flex: 1, alignItems: "center", flexDirection: "row" }}>
        <View style={{ flex: 1, alignItems: "center" }}>
            <View style={{
                width: areaWidth,
                height: areaWidth / 3.5,
                backgroundColor: props.isTurn ? "#587c9e" : "#204260",
                borderRadius: wp(1) * scale,
                overflow: "hidden",
                flexDirection: "row",
                transform: [{ rotate: props.side === "bottom" ? "" : (props.side === "left" ? "90deg" : "-90deg") }]
            }}>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                        <Text style={{
                            textAlign: "center",
                            backgroundColor: "goldenrod",
                            borderRadius: areaWidth * 0.01,
                            overflow: "hidden",
                            padding: areaWidth * 0.01,
                            fontSize: areaWidth * 0.04,
                            fontWeight: "800",
                            color: "white",
                            width: areaWidth * 0.07,
                            textShadowRadius: areaWidth * 0.01,
                            textShadowColor: "black",
                            textShadowOffset: { width: 0, height: 0 },
                        }}>{props.prestige || 0}</Text>
                    </View>
                    <View style={{
                        flex: 2,
                    }}>
                        <Text style={{
                            transform: [{ rotateZ: "-90deg" }],
                            overflow: "hidden",
                            marginTop: areaWidth * 0.08,
                            width: areaWidth * 0.17,
                            fontSize: areaWidth * 0.02,
                            fontWeight: "800",
                            color: "white",
                            textShadowRadius: areaWidth * 0.01,
                            textShadowColor: "black",
                            textShadowOffset: { width: 0, height: 0 },
                        }}>{props.name}</Text>
                    </View>
                </View>
                <View style={{ flex: 10 }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                        {
                            [
                                ["blue", props.coins.blue],
                                ["red", props.coins.red],
                                ["green", props.coins.green],
                                ["white", props.coins.white],
                                ["black", props.coins.black],
                                ["gold", props.coins.gold],
                            ].map(([color, count]: [CoinColor, number]) => {
                                return <View
                                    style={{
                                        flex: 1,
                                        alignItems: "center",
                                    }}>
                                    <Coin color={color} count={count} scale={0.6 * scale} isSelectable={count > 0 && props.coinsSelectable} onPress={() => { props.onCoinPress(color) }} />
                                </View>;
                            })
                        }
                    </View>
                    <View style={{
                        flex: 2,
                        flexDirection: "row",
                        alignItems: "center",
                    }}>
                        {
                            [
                                ["blue", props.cards?.blue],
                                ["red", props.cards?.red],
                                ["green", props.cards?.green],
                                ["white", props.cards?.white],
                                ["black", props.cards?.black],
                            ].map(([color, count]: [CardColor, number]) => {
                                return <View
                                    style={{
                                        flex: 1,
                                        alignItems: "center",
                                    }}>
                                    <Card color={color} scale={0.6 * scale} count={count} />
                                </View>;
                            })
                        }
                        <View style={{ flex: 1 }}>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingHorizontal: Math.min(wp(2), hp(3)) * scale * 1.2,
                                }}>
                                {
                                    props.reservedCards?.map(level => {
                                        return <View style={[{ flex: 1, alignItems: "center", direction: "ltr", backgroundColor: "black" }]}>
                                            <Card prestige={level} scale={0.6 * scale} />
                                        </View>;
                                    })
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    </View>;
};

export default class SplendorBoard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        let faceupCards = [];
        for (let i = 0; i < 3; i++) {
            faceupCards.push(new Array(4).fill(null));
        }

        this.state = {
            buttons: [["Back", "back", true]],
            faceupCards: [],
            coins: { white: 0, black: 0, red: 0, blue: 0, green: 0, gold: 0 },
            coinsSelectable: { white: false, black: false, red: false, blue: false, green: false, gold: false },
            pilesSelectable: [false, false, false],
            pilesVisible: [false, false, false],
            nobles: [],
            displayText: "Connecting to the server",
            playerStates: []
        };
    }

    updateBoard(state: State) {
        this.setState(state);
    }

    render() {
        return <SafeAreaView style={{
            flex: 1,
            backgroundColor: "#1c2147",
        }}>
            <View style={{ flex: 3, flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                    {this.state.playerStates.length > 2 &&
                        <PlayerArea side="left"
                            onCoinPress={(color) => { this.props.onAction({ type: "select-player-coin", color }); }}
                            name={this.state.playerStates[this.state.playerStates.length - 1].name}
                            isTurn={this.state.playerStates[this.state.playerStates.length - 1].isTurn}
                            coins={this.state.playerStates[this.state.playerStates.length - 1].coins}
                            coinsSelectable={this.state.playerStates[this.state.playerStates.length - 2].coinsSelectable}
                            cards={this.state.playerStates[this.state.playerStates.length - 1].cards}
                            reservedCards={this.state.playerStates[this.state.playerStates.length - 1].reservedCards}
                            prestige={this.state.playerStates[this.state.playerStates.length - 1].prestige} />
                    }
                </View>
                <View style={{ flex: 4, backgroundColor: "#587c9e" }}>
                    <View style={{ flex: 1, alignItems: "center", flexDirection: "row" }}>
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
                    <View style={{ flex: 1, alignItems: "center", flexDirection: "row" }}>
                        <Text style={{
                            textAlign: "center",
                            fontSize: wp(2),
                            fontWeight: "800",
                            color: "white",
                            textShadowColor: "black",
                            textShadowOffset: { width: 0, height: 0 },
                            flex: 1,
                        }}>{this.state.displayText}</Text>
                    </View>
                    <View style={{ flex: 10, flexDirection: "row" }}>
                        <View style={{ flex: 10 }}>
                            <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                                {
                                    ([
                                        [this.state.coins.blue, this.state.coinsSelectable.blue, "blue"],
                                        [this.state.coins.red, this.state.coinsSelectable.red, "red"],
                                        [this.state.coins.green, this.state.coinsSelectable.green, "green"],
                                        [this.state.coins.white, this.state.coinsSelectable.white, "white"],
                                        [this.state.coins.black, this.state.coinsSelectable.black, "black"],
                                        [this.state.coins.gold, this.state.coinsSelectable.gold, "gold"],
                                    ] as [number, boolean, CoinColor][]).map(
                                        ([count, isSelectable, color]) => {
                                            return <View style={{ flex: 1, alignItems: "center" }}>
                                                <Coin
                                                    isSelectable={isSelectable}
                                                    color={color}
                                                    count={count}
                                                    onPress={() => { this.props.onAction({ type: "select-coin", color }) }} />
                                            </View>

                                        }
                                    )
                                }
                            </View>
                            <View style={{ flex: 8, flexDirection: "column" }}>
                                {this.state.faceupCards.map((row, rowIndex) => {
                                    return <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                                        <View style={{ flex: 1, alignItems: "center" }}>{this.state.pilesVisible[2 - rowIndex] && <Card isSelectable={this.state.pilesSelectable[2 - rowIndex]} onPress={() => { this.props.onAction({ type: "select-pile-card", level: 3 - rowIndex }) }} prestige={3 - rowIndex} />}</View>
                                        {row.map((card, colIndex) => {
                                            return <View style={{ flex: 1, alignItems: "center" }}>{card && <Card isSelectable={card.isSelectable} onPress={() => { this.props.onAction({ type: "select-board-card", rowIndex, colIndex }) }} prestige={card.prestige} color={card.color} cost={card.cost} />}</View>;
                                        })}
                                    </View>;
                                })}
                            </View>
                        </View>
                        <View style={{ flex: 2, alignItems: "center" }}>
                            {this.state.nobles.map((noble, index) => {
                                return <View style={{ flex: 1, alignItems: "center", flexDirection: "row" }}>
                                    <View style={{ flex: 1, alignItems: "center" }}>
                                        {noble && <Noble cost={noble.cost} prestige={noble.prestige} isSelectable={noble.isSelectable} onPress={() => { this.props.onAction({ type: "select-noble-card", index }) }} nobleIndex={noble.nobleIndex} />}
                                    </View>
                                </View>;
                            })}
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    {this.state.playerStates.length > 2 &&
                        <PlayerArea side="right"
                            onCoinPress={(color) => { this.props.onAction({ type: "select-player-coin", color }); }}
                            name={this.state.playerStates[this.state.playerStates.length - 2].name}
                            isTurn={this.state.playerStates[this.state.playerStates.length - 2].isTurn}
                            coins={this.state.playerStates[this.state.playerStates.length - 2].coins}
                            coinsSelectable={this.state.playerStates[this.state.playerStates.length - 2].coinsSelectable}
                            cards={this.state.playerStates[this.state.playerStates.length - 2].cards}
                            reservedCards={this.state.playerStates[this.state.playerStates.length - 2].reservedCards}
                            prestige={this.state.playerStates[this.state.playerStates.length - 2].prestige} />
                    }
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
                {(this.state.playerStates.length === 2 || this.state.playerStates.length === 4) &&
                    <PlayerArea side="bottom"
                        onCoinPress={(color) => { this.props.onAction({ type: "select-player-coin", color }); }}
                        name={this.state.playerStates[1].name}
                        isTurn={this.state.playerStates[1].isTurn}
                        coins={this.state.playerStates[1].coins}
                        coinsSelectable={this.state.playerStates[1].coinsSelectable}
                        cards={this.state.playerStates[1].cards}
                        reservedCards={this.state.playerStates[1].reservedCards}
                        prestige={this.state.playerStates[1].prestige} />
                }
                {this.state.playerStates.length > 0 &&
                    <PlayerArea side="bottom"
                        onCoinPress={(color) => { this.props.onAction({ type: "select-player-coin", color }); }}
                        name={this.state.playerStates[0].name}
                        isTurn={this.state.playerStates[0].isTurn}
                        coins={this.state.playerStates[0].coins}
                        coinsSelectable={this.state.playerStates[0].coinsSelectable}
                        cards={this.state.playerStates[0].cards}
                        reservedCards={this.state.playerStates[0].reservedCards}
                        prestige={this.state.playerStates[0].prestige} />
                }
            </View>
        </SafeAreaView>;
    }
};
