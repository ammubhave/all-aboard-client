import React from 'react';

import socketIOClient from "socket.io-client";
import SequenceHand from '../../components/sequence/SequenceHand';
import SplendorHand from '../../components/splendor/SplendorHand';
import JaipurHand from '../../components/jaipur/JaipurHand';
import { SERVER_URI } from '../../config/constants';

type Props = { playerName: string };

export default class Hand extends React.Component<Props> {
    socket: SocketIOClient.Socket;
    hand: React.RefObject<JaipurHand>;

    constructor(props: Props) {
        super(props);
        this.hand = React.createRef();
    }

    async componentDidMount() {
        this.socket = socketIOClient(SERVER_URI, { query: { playerName: this.props.playerName } });
        this.socket.on("hand", (hand: any) => {
            if (hand === undefined || hand === null || Object.keys(hand).length === 0) {
                return;
            }
            this.hand.current.updateHand(hand);
        });
    }

    async componentWillUnmount() {
        this.socket.close();
    }

    onAction = async (action: any) => {
        this.socket.emit("action", action);
    }

    render() {
        return <JaipurHand ref={this.hand} onAction={this.onAction} />
    }
};
