import React from 'react';
import socketIOClient from "socket.io-client";

import { SERVER_URI } from '../../config/constants';
import CodenamesBoard from "../../components/codenames/CodenamesBoard";
import JaipurBoard from '../../components/jaipur/JaipurBoard';
import SequenceBoard from '../../components/sequence/SequenceBoard';
import SplendorBoard from '../../components/splendor/SplendorBoard';

type Props = {
    gameCode: string,
    gameName: string,
    password: string,
    onBack: () => void,
};

export default class BoardImpl extends React.Component<Props> {
    socket: SocketIOClient.Socket;
    board: React.RefObject<CodenamesBoard | JaipurBoard>;

    constructor(props: Props) {
        super(props);
        this.board = React.createRef();
    }

    async componentDidMount() {
        this.socket = socketIOClient(SERVER_URI, {
            query: {
                playerName: "board",
                gameCode: this.props.gameCode,
                gameName: this.props.gameName,
                password: this.props.password,
            },
        });
        this.socket.on("board", (board: any) => {
            if (Object.keys(board).length === 0) {
                return;
            }
            this.board.current.updateBoard(board);
        });
    }

    async componentWillUnmount() {
        this.socket.close();
    }

    onAction = async (action: any) => {
        this.socket.emit("action", action);
    };

    render() {
        const Impl = (() => {
            switch (this.props.gameName) {
                case 'codenames':
                    return CodenamesBoard;
                case 'jaipur':
                    return JaipurBoard;
                case 'sequence':
                    return SequenceBoard;
                case 'splendor':
                    return SplendorBoard;
            }
        })();
        return <Impl
            ref={this.board}
            onAction={this.onAction}
            onBack={this.props.onBack} />;
    }
};
