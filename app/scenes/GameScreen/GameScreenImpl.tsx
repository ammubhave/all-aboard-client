import React from 'react';
import socketIOClient from "socket.io-client";

import { SERVER_URI } from '../../config/constants';
import JaipurScreen from "../../components/jaipur/JaipurScreen";

type Props = {
    playerName: string,
    gameCode: string,
    gameName: string,
    password: string,
    onBack: () => void,
};

export default class GameScreenImpl extends React.Component<Props> {
    socket: SocketIOClient.Socket;
    screen: React.RefObject<JaipurScreen>;

    constructor(props: Props) {
        super(props);
        this.screen = React.createRef();
    }

    componentDidMount() {
        this.socket = socketIOClient(SERVER_URI, {
            query: {
                playerName: this.props.playerName,
                gameCode: this.props.gameCode,
                gameName: this.props.gameName,
                password: this.props.password,
            },
        });
        this.socket.on("content", (screen: any) => {
            if (Object.keys(screen).length === 0) {
                return;
            }
            this.screen.current.updateScreen(screen);
        });
    }

    componentWillUnmount() {
        this.socket.close();
    }

    onAction = async (action: any) => {
        this.socket.emit("action", action);
    };

    render() {
        const Impl = (() => {
            switch (this.props.gameName) {
                // case 'codenames':
                //     return CodenamesBoard;
                case 'jaipur':
                    return JaipurScreen;
                // case 'sequence':
                //     return SequenceBoard;
                // case 'splendor':
                //     return SplendorBoard;
            }
        })();
        return <Impl
            ref={this.screen}
            playerName={this.props.playerName}
            onAction={this.onAction}
            onBack={this.props.onBack} />;
    }
};
