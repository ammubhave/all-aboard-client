import React from 'react';
import { SafeAreaView } from 'react-native';
import BaseHand, { HandProps } from '../BaseHand';

type State = {
};

export default class CodenamesHand extends React.Component<HandProps, State> implements BaseHand<State> {
    constructor(props: HandProps) {
        super(props);
        this.state = {};
    }

    updateHand(hand: any) {
        this.setState(hand);
    }

    render() {
        return <SafeAreaView style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#446983",
        }}>

        </SafeAreaView>;
    }
}
