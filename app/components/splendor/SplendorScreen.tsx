import React from 'react';
import BaseGameScreen, { GameScreenProps } from "../BaseGameScreen";
import SplendorHand from "./SplendorHand";
import SplendorBoard from "./SplendorBoard";

export default class SplendorScreen extends React.Component<GameScreenProps> implements BaseGameScreen {
    board: React.RefObject<SplendorBoard>;
    hand: React.RefObject<SplendorHand>;

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
            return <SplendorBoard ref={this.board} onAction={this.props.onAction} onBack={this.props.onBack} />;
        } else {
            return <SplendorHand ref={this.hand} onAction={this.props.onAction} onBack={this.props.onBack} />;
        }
    }
};
