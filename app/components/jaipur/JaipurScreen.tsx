import React from 'react';
import BaseGameScreen, { GameScreenProps } from "../BaseGameScreen";
import JaipurHand from "./JaipurHand";
import JaipurBoard from "./JaipurBoard";

export default class JaipurScreen extends React.Component<GameScreenProps> implements BaseGameScreen {
    board: React.RefObject<JaipurBoard>;
    hand: React.RefObject<JaipurHand>;

    constructor(props: GameScreenProps) {
        super(props);
        this.board = React.createRef();
        this.hand = React.createRef();
    }

    updateScreen(content: any) {
        if (this.props.playerName === "board") {
            this.board.current.updateBoard(content);
        } else {
            this.hand.current.updateHand(content);
        }
    }

    render() {
        if (this.props.playerName === "board") {
            return <JaipurBoard ref={this.board} onAction={this.props.onAction} onBack={this.props.onBack} />;
        } else {
            return <JaipurHand ref={this.hand} onAction={this.props.onAction} onBack={this.props.onBack} />;
        }
    }
};
