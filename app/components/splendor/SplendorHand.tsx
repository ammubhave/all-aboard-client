import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { ScreenOrientation } from 'expo';
import { Card, CardInfo } from './SplendorBoard';
import { heightPercentageToDP } from "react-native-responsive-screen";

type Props = {
    onAction(action: any): Promise<void>;
    onBack(): void;
};

type State = {
    hand: CardInfo[],
    displayText: string,
};

export default class SplendorHand extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            hand: [],
            displayText: "Waiting for a new game",
        };
    }

    async componentDidMount() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }

    async componentWillUnmount() {
        await ScreenOrientation.unlockAsync();
    }

    updateHand(hand: any) {
        this.setState(hand);
    }

    renderHand() {
        return [this.state.hand.map((card, i) => <View style={{ flex: 1, marginVertical: heightPercentageToDP(4), alignItems: "center" }}>{
            <Card prestige={card.prestige} cost={card.cost} color={card.color} isSelectable={card.isSelectable} scale={1.8} onPress={() => this.props.onAction({ type: "select-hand-card", index: i })} />
        }</View>), new Array(3 - this.state.hand.length).fill(null).map(_ => <View style={{ flex: 1 }} />)];
    }

    render() {
        return <SafeAreaView style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#1c2147",
        }}>
            <View style={{ flex: 3, flexDirection: "row" }}>
                {/* <ScrollView style={{ flex: 1, flexDirection: "row", marginVertical: 20 }} horizontal={true}> */}
                {this.renderHand()}
                {/* </ScrollView> */}
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ flex: 1, textAlign: "center", lineHeight: 80, fontSize: 35, color: "white", textShadowColor: "black", textShadowRadius: 10, }}>{this.state.displayText}</Text>
            </View>
        </SafeAreaView>;
    }
}
