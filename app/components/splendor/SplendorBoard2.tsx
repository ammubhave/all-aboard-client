import React from 'react';
import { View, Text, SafeAreaView, Button, ImageBackground, TouchableHighlight } from 'react-native';
import { ScreenOrientation } from 'expo';

// import { getCardChar, getCardColor } from './constants';
import BaseBoard, { BoardProps } from '../BaseBoard';

type Card = {
    color: string,
    prestige: number,
    cost: { white: number, black: number, red: number, blue: number, green: number; };
};

type Noble = {
    cost: { color: string, count: number; }[],
    prestige: number,
};

type BoardState = {
    faceupCards: Card[][],
    coins: { white: number, black: number, red: number, blue: number, green: number, gold: number; },
    nobles: Noble[],
    currentPlayerIndex: number,
};

type State = BoardState;

export default class SplendorBoard extends React.Component<BoardProps, State> implements BaseBoard<State> {

    constructor(props: BoardProps) {
        super(props);

        let faceupCards = [];
        for (let i = 0; i < 3; i++) {
            faceupCards.push(new Array(4).fill({ color: "blue", prestige: 3, cost: { white: 0, green: 3, red: 3, black: 5, blue: 0 } }));
        }

        faceupCards[0][0] = { color: "red", prestige: 3, cost: { green: 3, red: 3, black: 5, white: 0, blue: 0 } };

        this.state = {
            faceupCards,
            coins: { white: 0, black: 0, red: 0, blue: 0, green: 0, gold: 0 },
            nobles: [{ cost: [{ color: "green", count: 4 }, { color: "green", count: 4 }, { color: "green", count: 4 }], prestige: 3 }, null, null, null, null],
            currentPlayerIndex: -1,
        };
    }

    async componentDidMount() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }

    async componentWillUnmount() {
        await ScreenOrientation.unlockAsync();
    }

    updateBoard(board: BoardState) {
        this.setState(board);
    }

    updatePlayers(players: string[]) {

    }

    onCardPress = (rowIndex: number, colIndex: number) => {
        this.props.onAction({
            type: "card",
            rowIndex,
            colIndex
        });
    };

    onCoinPress = (color: string) => {
        this.props.onAction({
            type: "coin",
            color
        });
    };

    onNoblePress = (nobleIndex: number) => {
        this.props.onAction({
            type: "noble",
            nobleIndex
        });
    };

    renderCard(cell: Card, rowIndex: number, colIndex: number) {
        if (cell === null) {
            return <View></View>;
        }
        const renderCoinCost = (color, count) => {
            if (count === 0) {
                return;
            }
            let forecolor = "white";
            if (color === "white") {
                forecolor = "black";
            }
            return <View style={{
                flex: 1,
                paddingRight: "75%"
            }}>
                <View style={{
                    borderRadius: "50%",
                    height: "100%",
                    width: "100%",
                    backgroundColor: this.getBackgroundColorCardCoin(color),
                    flex: 1,
                }}><Text style={{ textAlign: "center", fontSize: 27, fontWeight: "800", color: forecolor }}>{count}</Text></View>
            </View>;
        };

        let backgroundColor = cell.color;
        if (backgroundColor === "black") {
            backgroundColor = "rgb(50,50,50)";
        }

        return <TouchableHighlight
            style={{
                height: "100%",
                width: "100%",
                backgroundColor: backgroundColor,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#fff',
            }}
            onPress={() => this.onCardPress(rowIndex, colIndex)}
            underlayColor='#fff'>
            <View style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                <View style={{ flex: 1, backgroundColor: "rgba(255, 255, 255, 0.7)" }}>
                    <Text style={{ flex: 1, lineHeight: "60%", fontSize: 50, paddingLeft: "6%", color: "white", fontWeight: "800", textShadowRadius: 5, textShadowColor: "black" }}>{cell.prestige}</Text>
                </View>
                <View style={{ flex: 3, display: "flex", padding: "3%", backgroundColor: "rgba(0,0,0,0.3)" }}>
                    <View style={{ flex: 0.2 }}></View>
                    {Object.entries(cell.cost).filter(val => val[1] === 0).map(_ => <View style={{
                        flex: 1,
                        paddingRight: "75%"
                    }} />)}

                    {renderCoinCost("white", cell.cost.white)}
                    {renderCoinCost("blue", cell.cost.blue)}
                    {renderCoinCost("green", cell.cost.green)}
                    {renderCoinCost("red", cell.cost.red)}
                    {renderCoinCost("black", cell.cost.black)}
                </View>
            </View>
        </TouchableHighlight>;
    }

    getBackgroundColorCardCoin(color: string) {
        switch (color) {
            case 'white':
                return 'rgb(255,255,255)';
            case 'black':
                return 'rgb(20,20,20)';
            case 'red':
                return 'rgb(255,0,0)';
            case 'blue':
                return 'rgb(0,0,255)';
            case 'green':
                return 'rgb(0,128,0)';
        }
        return "";
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

    renderCoin(color: string, count: number) {
        const backgroundColor = this.getBackgroundColor(color);

        let forecolor = "white";
        if (color === "white") {
            forecolor = "black";
        }

        return <TouchableHighlight
            style={{
                borderRadius: "50%",
                height: "100%",
                width: "100%",
                backgroundColor: backgroundColor,
            }}
            onPress={() => this.onCoinPress(color)}
            underlayColor='#fff'>
            <Text style={{ flex: 1, textAlign: "center", lineHeight: "118%", fontSize: 80, fontWeight: "800", color: forecolor, textShadowRadius: 5, textShadowColor: "black" }}>{count}</Text>
        </TouchableHighlight>;
    }

    renderNoble(noble: Noble, nobleIndex: number) {
        if (noble === null) {
            return <View style={{ flex: 1 }}></View>;
        }
        const { cost, prestige } = noble;
        while (cost.length < 3) {
            cost.unshift(null);
        }
        const renderCardCost = (cost) => {
            if (cost === null) {
                return <View style={{ flex: 1 }}></View>;
            }
            const { color, count } = cost;

            let forecolor = "white";
            if (color === "white") {
                forecolor = "black";
            }
            return <View style={{
                flex: 1,
                paddingRight: "2%",
                paddingBottom: "4%",
            }}>
                <View style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: this.getBackgroundColor(color),
                    flex: 1,
                    borderWidth: 1,
                }}><Text style={{ textAlign: "center", fontSize: 27, fontWeight: "800", color: forecolor }}>{count}</Text></View>
            </View>;
        };

        return <TouchableHighlight
            style={{
                height: "100%",
                width: "100%",
            }}
            onPress={() => this.onNoblePress(nobleIndex)}
            underlayColor='#fff'>
            <View style={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
            }}>
                <View style={{ flex: 1, display: "flex", padding: "3%", backgroundColor: "rgba(255, 255, 255, 0.7)" }}>
                    <Text style={{ flex: 1, textAlign: "center", fontSize: 30, paddingLeft: "6%", color: "white", fontWeight: "800", textShadowRadius: 5, textShadowColor: "black" }}>{prestige}</Text>
                    {cost.map(cost => {
                        return renderCardCost(cost);
                    })}
                </View>
                <View style={{ flex: 3, backgroundColor: "rgba(128, 128, 128, 0.5)" }}></View>
            </View>
        </TouchableHighlight>;
    }

    render() {
        const { faceupCards, coins, nobles, currentPlayerIndex } = this.state;

        // if (currentPlayerIndex === -1) {
        //     return <Button title="Start Game" onPress={this.props.onStart} />;
        // }

        const styles = {
            card: {
                flex: 1,
                paddingTop: "6.5%",
                paddingBottom: "1.5%",
                paddingLeft: "6%",
                paddingRight: "6%",
            },
            cardCell: {
                flex: 1,
                display: "flex",
            },
            cardRow: {
                flex: 1,
                flexDirection: 'row',
                display: 'flex',
            },
            coinCell: {
                flex: 1,
                display: "flex",
                paddingLeft: "3%",
                paddingRight: "2.8%",
            },
            nobleCell: {
                flex: 1,
                display: "flex",
                paddingTop: "4.5%",
                paddingBottom: "13%",
                paddingRight: "11.05%"
            }
        };

        const renderCoinCell = (color: string, count: number) => {
            return <View style={styles.coinCell}>
                {this.renderCoin(color, count)}
            </View>;
        };

        return <ImageBackground source={require("./board.jpg")} resizeMode="stretch" style={{ flex: 1 }}>
            <View style={{
                flex: 4.5, flexDirection: 'row',
                display: "flex"
            }}>
                <View style={{ flex: 4 }}>

                </View>
                <View style={{ flex: 11, display: "flex", flexDirection: 'column', paddingTop: "2%", paddingLeft: "4.1%", paddingRight: "1.1%", paddingBottom: "1.4%" }}>
                    {faceupCards.map((row, rowIndex) => {
                        return <View style={styles.cardRow}>
                            {row.map((cell, colIndex) => {
                                return <View style={styles.cardCell}>
                                    <View style={styles.card}>{this.renderCard(cell, rowIndex, colIndex)}</View>
                                </View>;
                            })}
                        </View>;
                    })}
                </View>
                <View style={{ flex: 7 }}>
                    <View style={{ flex: 1, flexDirection: "column", display: "flex", paddingTop: 208, paddingBottom: 5, paddingRight: "10%", paddingLeft: "8%" }}>
                        <View style={{ flex: 1, display: "flex", paddingLeft: "25%", paddingRight: "31%" }}>
                            <View style={styles.nobleCell}>{this.renderNoble(nobles[0], 0)}</View>
                        </View>
                        <View style={{ flex: 0.05 }}></View>
                        <View style={{ flex: 1, flexDirection: "row", display: "flex" }}>
                            <View style={styles.nobleCell}>{this.renderNoble(nobles[1], 1)}</View>
                            <View style={styles.nobleCell}>{this.renderNoble(nobles[2], 2)}</View>
                        </View>
                        <View style={{ flex: 1, flexDirection: "row", display: "flex" }}>
                            <View style={styles.nobleCell}>{this.renderNoble(nobles[3], 3)}</View>
                            <View style={styles.nobleCell}>{this.renderNoble(nobles[4], 4)}</View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 1, flexDirection: "row", paddingBottom: "31.5%", paddingTop: "1.2%" }}>
                    <View style={{ flex: 2.5, flexDirection: "row" }}>
                        <View style={{ flex: 1, display: "flex", flexDirection: "row", paddingRight: "2.27%", paddingLeft: "27.5%" }}>
                            {renderCoinCell("white", coins.white)}
                            {renderCoinCell("black", coins.black)}
                            {renderCoinCell("red", coins.red)}
                            {renderCoinCell("blue", coins.blue)}
                            {renderCoinCell("green", coins.green)}
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={{ flex: 1, paddingRight: "67%", paddingLeft: "7%" }}>
                            {renderCoinCell("gold", coins.gold)}
                        </View>
                    </View>
                </View>
            </View>
        </ImageBackground >;
    }
};
