import React from 'react';
import axios from 'axios';

import socketIOClient from "socket.io-client";
import SequenceBoard from '../../components/sequence/SequenceBoard';
import SplendorBoard from '../../components/splendor/SplendorBoard';
import JaipurBoard from '../../components/jaipur/JaipurBoard';
import { SERVER_URI } from '../../config/constants';

type Props = {};

export default class Board extends React.Component<Props> {
    socket: SocketIOClient.Socket;
    board: React.RefObject<JaipurBoard>;

    constructor(props: Props) {
        super(props);
        this.board = React.createRef();
    }

    async componentDidMount() {
        this.socket = socketIOClient(SERVER_URI, { query: { playerName: "board" } });
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

    onStart = async () => {
        this.socket.emit("start");
    }

    onAction = async (action: any) => {
        this.socket.emit("action", action);
    }

    render() {
        return <JaipurBoard onStart={this.onStart} onAction={this.onAction} ref={this.board} />
    }
};
