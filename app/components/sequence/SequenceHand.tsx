import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { ScreenOrientation } from 'expo';
import { getCardColor, getCardChar } from '../../components/sequence/constants';
import BaseHand, { HandProps } from '../BaseHand';

type State = {
    hand: {
        hand: string[],
    }
};

export default class SequenceHand extends React.Component<HandProps, State> implements BaseHand<State> {
    constructor(props: HandProps) {
        super(props);

        this.state = {
            hand: {
                hand: []
            }
        };
    }

    async componentDidMount() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }

    async componentWillUnmount() {
        await ScreenOrientation.unlockAsync();
    }

    updateHand(hand: any) {
        if (Object.keys(hand).length === 0)
            return;
        console.log(hand);
        this.setState({ hand });
    }

    renderCard(card: string) {
        const char = getCardChar(card);
        return <Text style={{ fontSize: 148, color: getCardColor(card) }}>
            {char ?? card}
        </Text>
    }

    renderHand() {
        return this.state.hand.hand.map(this.renderCard);
    }

    render() {
        return <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 3, marginTop: 9 }} horizontal={true}>
                {this.renderHand()}
            </ScrollView>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Hello</Text>
            </View>
        </SafeAreaView>
    }
}
