import React from 'react';

import socketIOClient from "socket.io-client";
import SequenceHand from '../../components/sequence/SequenceHand';
import SplendorHand from '../../components/splendor/SplendorHand';
import JaipurHand from '../../components/jaipur/JaipurHand';
import { SERVER_URI } from '../../config/constants';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { RouteProp } from "@react-navigation/native";
import CodenamesHand from "../../components/codenames/CodenamesHand";

type HandScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Hand'>;
type HandScreenRouteProp = RouteProp<RootStackParamList, 'Hand'>;
type HandScreenProps = {
    navigation: HandScreenNavigationProp;
    route: HandScreenRouteProp;
};

export default class Hand extends React.Component<HandScreenProps> {
    render() {
        return <HandImpl
            playerName={this.props.route.params.playerName}
            gameCode={this.props.route.params.gameCode}
            gameName={this.props.route.params.gameName}
            password={this.props.route.params.password}
            onBack={this.props.navigation.goBack} />;
    }
};

type Props = {
    playerName: string,
    gameCode: string,
    gameName: string,
    password: string,
    onBack: () => void,
};
export class HandImpl extends React.Component<Props> {
    socket: SocketIOClient.Socket;
    hand: React.RefObject<JaipurHand | SequenceHand | SplendorHand>;

    constructor(props: Props) {
        super(props);
        this.hand = React.createRef();
    }

    async componentDidMount() {
        this.socket = socketIOClient(SERVER_URI, {
            query: {
                playerName: this.props.playerName,
                gameCode: this.props.gameCode,
                gameName: this.props.gameName,
                password: this.props.password,
            },
        });
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
        const Impl = (() => {
            switch (this.props.gameName) {
                case 'codenames':
                    return CodenamesHand;
                case 'jaipur':
                    return JaipurHand;
                case 'sequence':
                    return SequenceHand;
                case 'splendor':
                    return SplendorHand;
            }
        })();

        return <Impl ref={this.hand} onAction={this.onAction} />;
    }
};
