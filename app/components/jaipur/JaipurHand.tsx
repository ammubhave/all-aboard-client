import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { ScreenOrientation } from 'expo';
import { renderCard } from './utils';

type Props = {
    onAction(action: any): Promise<void>;
    onBack(): void;
};

type State = {
    hand: string[],
    handIsSelected: boolean[],
    displayText: string,
};

export default class JaipurHand extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            hand: [],
            handIsSelected: [],
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
        return this.state.hand.map((card, i) => <TouchableOpacity onPress={() => this.props.onAction({ type: "select-hand-card", index: i })}>{renderCard(card, this.state.handIsSelected[i], {
            position: undefined,
            flex: 1,
            height: Dimensions.get('window').height * 0.2,
            width: Dimensions.get('window').height * 0.4,
            borderWidth: 1,
            borderRadius: 15,
            shadowColor: "black",
            shadowRadius: 3,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.6,
            backgroundColor: "white",
            padding: 10,
            paddingTop: 10,
            paddingBottom: 10,
            marginHorizontal: 5,
        })}</TouchableOpacity>);
    }

    render() {
        return <SafeAreaView style={{
            flex: 1,
            flexDirection: "column",
            backgroundColor: "#5aa57c",
        }}>
            <View style={{ flex: 3 }}>
                <ScrollView style={{ flex: 1, flexDirection: "row", marginVertical: 20 }} horizontal={true}>
                    {this.renderHand()}
                </ScrollView>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ flex: 1, textAlign: "center", lineHeight: 80, fontSize: 35, color: "white", textShadowColor: "black", textShadowRadius: 10, }}>{this.state.displayText}</Text>
            </View>
        </SafeAreaView>;
    }
}
