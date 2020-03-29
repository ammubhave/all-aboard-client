import React from 'react';

import socketIOClient from "socket.io-client";
import SequenceHand from '../../components/sequence/SequenceHand';
import SplendorHand from '../../components/splendor/SplendorHand';
import JaipurHand from '../../components/jaipur/JaipurHand';
import { SERVER_URI } from '../../config/constants';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { RouteProp } from "@react-navigation/native";

type HandScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Hand'>;
type HandScreenRouteProp = RouteProp<RootStackParamList, 'Hand'>;
type Props = {
    navigation: HandScreenNavigationProp;
    route: HandScreenRouteProp;
};

export default class Hand extends React.Component<Props> {
    socket: SocketIOClient.Socket;
    hand: React.RefObject<JaipurHand | SequenceHand | SplendorHand>;

    constructor(props: Props) {
        super(props);
        this.hand = React.createRef();
    }

    async componentDidMount() {
        this.socket = socketIOClient(SERVER_URI, { query: { playerName: this.props.route.params.playerName } });
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
    };

    render() {
        const HandImpl = (() => {
            switch (this.props.route.params.game) {
                case 'jaipur':
                    return JaipurHand;
                case 'sequence':
                    return SequenceHand;
                case 'splendor':
                    return SplendorHand;
            }
        })();

        return <HandImpl ref={this.hand} onAction={this.onAction} />;
    }
};
