import React from 'react';
import { StyleProp, ViewStyle, View, Image, ImageBackground, Text, Dimensions, TouchableOpacity, GestureResponderEvent } from "react-native";
import styles, { HEIGHT, WIDTH, MIN_WIDTH_HEIGHT } from "./styles";


export const Card: React.FunctionComponent<{ top?: number, bottom?: number, left?: number, right?: number, flip?: boolean, type: string, count?: number, selected?: boolean, isSelectable?: boolean, disabled?: boolean, onPress?: (event: GestureResponderEvent) => void; }> = (props) => {
    const cardTypeToImage = {
        'camel': require('./camel_card.png'),
        'cloth': require('./cloth_card.png'),
        'cover': require('./cover_card.png'),
        'diamond': require('./diamond_card.png'),
        'gold': require('./gold_card.png'),
        'leather': require('./leather_card.png'),
        'silver': require('./silver_card.png'),
        'spice': require('./spice_card.png'),
    };

    const RootElement: React.FunctionComponent<{ style: StyleProp<ViewStyle>; }> = (rootProps) => {
        return props.isSelectable ?
            <TouchableOpacity style={rootProps.style} onPress={props.onPress}>{rootProps.children}</TouchableOpacity> :
            <View style={rootProps.style}>{rootProps.children}</View>;
    };

    return <RootElement style={[styles.card, {
        top: HEIGHT(props.top),
        bottom: HEIGHT(props.bottom),
        left: WIDTH(props.left),
        right: WIDTH(props.right),
    },
    props.flip && { transform: [{ rotateX: "180deg" }, { rotateY: "180deg" }] }
    ]}>
        <ImageBackground source={cardTypeToImage[props.type]} style={{ width: "100%", height: "100%" }}>
            {props.count && <Text style={{
                fontSize: 70,
                textAlign: "center",
                height: "100%",
                color: "white",
                fontWeight: "800",
                textShadowRadius: 10,
                textShadowColor: "black",
                top: "26%",
            }}>{props.count}</Text>}
            <View></View>
            {props.selected && <Text style={[{
                textAlign: "center",
                textAlignVertical: "center",
            } as {
                textAlign: "center",
                textAlignVertical: "center";
            }, {
                fontSize: MIN_WIDTH_HEIGHT(2),
                color: "green",
                left: "4%",
                backgroundColor: "white",
                width: "25%",
                top: "4%",
                height: "16%",
                lineHeight: 23.5,
                borderRadius: MIN_WIDTH_HEIGHT(1.5),
                overflow: "hidden",
                fontWeight: "800",
                borderWidth: 3,
                borderColor: "green",
                position: "absolute",
            }]}>✓</Text>}
        </ImageBackground>
        {/* {!props.disabled && <View style={[styles.card, {
            top: HEIGHT(props.top),
            bottom: HEIGHT(props.bottom),
            left: WIDTH(props.left),
            right: WIDTH(props.right),
            backgroundColor: "rgba(0,0,0,0.5)",
        }]}></View>} */}
    </RootElement>;
};


export const Coin: React.FunctionComponent<{ top?: number, bottom?: number, left?: number, right?: number, flip?: boolean, value: number; }> = (props) => {
    return <View style={[styles.token, {
        top: HEIGHT(props.top),
        bottom: HEIGHT(props.bottom),
        left: WIDTH(props.left),
        right: WIDTH(props.right),
        width: Dimensions.get('window').width * 0.08,
        height: Dimensions.get('window').width * 0.08,
    },
    props.flip && { transform: [{ rotateX: "180deg" }, { rotateY: "180deg" }] }]
    }>
        <ImageBackground source={require('./coin.png')} style={{ width: "100%", height: "100%" }}>
            <Text style={{
                color: "white", position: "relative", fontSize: 60, top: "17%", left: "0%", fontWeight: "800", textAlign: "center",
                textShadowRadius: 10,
                textShadowColor: "black",
            }}>{props.value}</Text>
        </ImageBackground>
    </View>;
};

export const Token: React.FunctionComponent<{ top?: number, bottom?: number, left?: number, right?: number, flip?: boolean, type: string, value?: number; }> = (props) => {
    const tokenTypeToImage = {
        'bonus_3': require('./bonus_3_token.png'),
        'bonus_4': require('./bonus_4_token.png'),
        'bonus_5': require('./bonus_5_token.png'),
        'camel': require('./camel_token.png'),
        'cloth': require('./cloth_token.png'),
        'diamond': require('./diamond_token.png'),
        'gold': require('./gold_token.png'),
        'leather': require('./leather_token.png'),
        'seal_of_excellence': require('./seal_of_excellence.png'),
        'silver': require('./silver_token.png'),
        'spice': require('./spice_token.png'),
        'coin': require('./coin.png'),
    };

    return <View style={[styles.token, {
        top: HEIGHT(props.top),
        bottom: HEIGHT(props.bottom),
        left: WIDTH(props.left),
        right: WIDTH(props.right),
    },
    props.flip && { transform: [{ rotateX: "180deg" }, { rotateY: "180deg" }] }]}>
        <ImageBackground source={tokenTypeToImage[props.type]} style={{ width: "100%", height: "100%" }}>
            {props.type !== 'coin' && props.value !== undefined && props.value !== null && props.value >= 0 && [
                <Text style={{ color: "white", position: "relative", top: "3%", left: "44%", fontWeight: "800" }}>{props.value}</Text>,
                <Text style={{ color: "white", position: "relative", top: "-27%", left: "-36.5%", fontWeight: "800", transform: [{ rotateZ: "-90deg" }] }}>{props.value}</Text>,
                <Text style={{ color: "white", position: "relative", top: "33%", left: "-44%", fontWeight: "800", transform: [{ rotateZ: "-180deg" }] }}>{props.value}</Text>,
                <Text style={{ color: "white", position: "relative", top: "19%", left: "36.4%", fontWeight: "800", transform: [{ rotateZ: "-270deg" }] }}>{props.value}</Text>]
            }
            {props.type === 'coin' && props.value >= 0 && <Text style={{
                color: "white", position: "absolute", fontSize: 40, top: "19%", left: "35%", fontWeight: "800", textAlign: "center",
                textShadowRadius: 10,
                textShadowColor: "black",
            }}>{props.value}</Text>}
        </ImageBackground>
    </View >;
};

export const Button: React.FunctionComponent<{ flip?: boolean, title: string, disabled?: boolean, onPress?: (event: GestureResponderEvent) => void; }> = (props) => {
    return <TouchableOpacity
        disabled={props.disabled}
        onPress={props.onPress}
        style={{
            backgroundColor: props.disabled ? "grey" : "red",
            flex: 1,
            borderRadius: 30,
            margin: 5,
        }}
    >
        <Text style={{
            flex: 1,
            color: "white",
            fontWeight: "800",
            fontSize: 20,
            textAlign: "center",
            textAlignVertical: "center",
            borderWidth: 3,
            borderRadius: 12,
            padding: 2,
            borderColor: 'black',
        }}>
            {props.title}
        </Text>
    </TouchableOpacity>;
};

export function renderCard(type: string, isSelected = false, style: StyleProp<ViewStyle> = false) {
    const cardTypeToImage = {
        'camel': require('./camel_card.png'),
        'cloth': require('./cloth_card.png'),
        'cover': require('./cover_card.png'),
        'diamond': require('./diamond_card.png'),
        'gold': require('./gold_card.png'),
        'leather': require('./leather_card.png'),
        'silver': require('./silver_card.png'),
        'spice': require('./spice_card.png'),
    };

    return <View style={[styles.card, style]}>
        <Image source={cardTypeToImage[type]} style={{ resizeMode: "stretch", width: "100%", height: "100%" }} />
        {isSelected && <Text style={[{
            textAlign: "center",
            textAlignVertical: "center",
        } as {
            textAlign: "center",
            textAlignVertical: "center";
        }, {
            fontSize: MIN_WIDTH_HEIGHT(5),
            color: "green",
            left: "4%",
            backgroundColor: "white",
            width: "25%",
            top: "4%",
            height: "16%",
            lineHeight: 23.5,
            borderRadius: MIN_WIDTH_HEIGHT(4),
            overflow: "hidden",
            fontWeight: "800",
            borderWidth: 3,
            borderColor: "green",
            position: "absolute",
        }]}>✓</Text>}
    </View >;
}
