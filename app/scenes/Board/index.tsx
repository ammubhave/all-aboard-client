import React from 'react';

import socketIOClient from "socket.io-client";
import SequenceBoard from '../../components/sequence/SequenceBoard';
import SplendorBoard from '../../components/splendor/SplendorBoard';
import JaipurBoard from '../../components/jaipur/JaipurBoard';
import { SERVER_URI } from '../../config/constants';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { RouteProp } from "@react-navigation/native";
import CodenamesBoard from "../../components/codenames/CodenamesBoard";

type BoardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Board'>;
type BoardScreenRouteProp = RouteProp<RootStackParamList, 'Board'>;
type BoardScreenProps = { navigation: BoardScreenNavigationProp, route: BoardScreenRouteProp; };

export default class Board extends React.Component<BoardScreenProps> {
    render() {
        return <BoardImpl
            gameCode={this.props.route.params.gameCode}
            gameName={this.props.route.params.gameName}
            password={this.props.route.params.password}
            onBack={this.props.navigation.goBack} />;
    }
}

type Props = {
    gameCode: string,
    gameName: string,
    password: string,
    onBack: () => void,
};
export class BoardImpl extends React.Component<Props> {
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

    onStart = async () => {
        this.socket.emit("start");
    };

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
            onStart={this.onStart}
            onAction={this.onAction}
            onBack={this.props.onBack} />;
    }
};
