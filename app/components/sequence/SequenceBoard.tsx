import React from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import { ScreenOrientation } from 'expo';

import { getCardChar, getCardColor } from './constants';
import BaseBoard, { BoardProps } from '../BaseBoard';

type BoardCell = {
    card: string,
    state: string,
};

type BoardState = {
    layout: BoardCell[][],
    currentPlayer: number,
};

type State = {
    board: BoardState,
};

export default class SequenceBoard extends React.Component<BoardProps, State> implements BaseBoard<State> {
    constructor(props: BoardProps) {
        super(props);

        this.state = {
            board: {
                layout: [],
                currentPlayer: -1,
            }
        };
    }

    async componentDidMount() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }

    async componentWillUnmount() {
        await ScreenOrientation.unlockAsync();
    }

    updateBoard(board: BoardState) {
        this.setState({ board });
    }


    updatePlayers(players: string[]) {

    }

    renderCard = (cell: BoardCell) => {
        const { card, state } = cell;

        let color = getCardColor(card);
        let char = getCardChar(card);

        return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text numberOfLines={1} style={{ color, fontSize: 155, textAlignVertical: "center", padding: 0, margin: 0 }} adjustsFontSizeToFit={true}>
                {char ?? card}
            </Text>
        </View >;
    };

    renderCardRow = (row: BoardCell[]) => {
        return <View style={{ flex: 1, flexDirection: "row" }}>{row.map(this.renderCard)}</View>;
    };

    render() {
        const { board } = this.state;

        if (board.currentPlayer === undefined) {
            return <Button title="Start Game" onPress={this.props.onStart} />;
        }

        return <SafeAreaView style={{ flex: 1 }}>
            {board.layout.map(this.renderCardRow)}
        </SafeAreaView>;
    }
};
