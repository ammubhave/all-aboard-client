import React from 'react';
import { View, StyleProp, ViewStyle, ImageStyle, Image, Text } from "react-native";
import styles, { WIDTH, HEIGHT, RANGE } from "./styles";

const BoardMapStrip: React.FunctionComponent<{ width: number, top?: number, bottom?: number; }> = (props) => {
    return <View style={
        [styles.mat_strips, {
            width: WIDTH(props.width),
            top: HEIGHT(props.top),
            bottom: HEIGHT(props.bottom),
        }]}>{props.children}</View>;
};

const BoardMapStripCircle: React.FunctionComponent<{ top?: number, bottom?: number, left?: number; }> = (props) => {
    return <View style={
        [styles.mat_strip_circle, {
            top: HEIGHT(props.top),
            bottom: HEIGHT(props.bottom),
            left: WIDTH(props.left),
        }]}>{props.children}</View>;
};

const BoardMatCard: React.FunctionComponent<{ top?: number, bottom?: number, left?: number, glow?: boolean; }> = (props = { glow: false }) => {
    return <View style={[styles.mat_card, {
        top: HEIGHT(props.top),
        bottom: HEIGHT(props.bottom),
        left: WIDTH(props.left),
    },
    props.glow && styles.mat_card_glow,
    ]}>{props.children}</View>;
};

const BoardCamel: React.FunctionComponent<{ top?: number, bottom?: number, left?: number, flip?: boolean; }> = (props = { flip: false }) => {
    return <Image source={require('./camel-char.png')}
        style={
            [{
                position: "absolute",
                height: "5%",
                width: "5%",
                opacity: 0.2,
                resizeMode: "stretch",
                top: HEIGHT(props.top),
                bottom: HEIGHT(props.bottom),
                left: WIDTH(props.left),
            },
            props.flip && { transform: [{ rotateX: "180deg" }, { rotateY: "180deg" }] }]
        } />;
};

const BoardGoodsTokenTrack: React.FunctionComponent<{ top: number; }> = (props) => {
    return <View style={[styles.mat_goods_token_track, { top: HEIGHT(props.top) }]} />;
};

const BoardBonusTokenTrack: React.FunctionComponent<{ top: number; }> = (props) => {
    return <View style={[styles.mat_bonus_token_track, { top: HEIGHT(props.top) }]} />;
};

export default function renderBoardMat() {
    const renderMatStrips = () => {
        return [
            <BoardMapStrip width={100} top={7} />,
            <BoardMapStrip width={100} bottom={7} />,
            <BoardMapStrip width={65} top={20} />,
            <BoardMapStrip width={65} bottom={20} />,

            RANGE(39, 55, 3).map(left => [
                <BoardMapStripCircle top={4} left={left} />,
                <BoardMapStripCircle bottom={4} left={left} />
            ]),
        ];
    };

    const renderGreyMat = () => {
        return <View style={styles.mat_grey_cover}></View>;
    };

    const goodsTokenTrackTop = styles.goodsTokenTrack.top;
    const goodsTokenTrackBottom = styles.goodsTokenTrack.bottom;
    const bonusTokenTrackTop = styles.bonusTokenTrack.top;
    const bonusTokenTrackBottom = styles.bonusTokenTrack.bottom;

    return [
        renderMatStrips(),

        <BoardCamel left={40} top={6.5} flip />,
        RANGE(1, 11.5, 3).map(left => <BoardCamel left={left} top={13} flip />),
        RANGE(27.5, 32.75, 2).map(left => <BoardCamel left={left} top={13} flip />),

        <BoardCamel left={40} bottom={6.5} />,
        RANGE(1, 11.5, 3).map(left => <BoardCamel left={left} bottom={13} />),
        RANGE(27.5, 32.75, 2).map(left => <BoardCamel left={left} bottom={13} />),

        <BoardMatCard left={5} top={30}>
            <View style={[styles.mat_discard_pile]}>
                <Text style={
                    {
                        transform: [{ rotateZ: "-90deg" }],
                        top: "38%",
                        fontSize: 35,
                        color: "rgba(255, 215, 0, 0.2)",
                        shadowOpacity: 1,
                        shadowColor: "white",
                        shadowOffset: { width: 0, height: 0 }
                    }
                }>Discard</Text>
            </View>
        </BoardMatCard>,
        <BoardMatCard left={5} bottom={30} />,
        <BoardMatCard left={17} top={5} />,
        <BoardMatCard left={17} bottom={5} />,

        RANGE(17, 61, 5).map(left => <BoardMatCard left={left} top={42} glow />),

        renderGreyMat(),
        RANGE(goodsTokenTrackTop, goodsTokenTrackBottom, 6).map(top => <BoardGoodsTokenTrack top={top} />),
        RANGE(bonusTokenTrackTop, bonusTokenTrackBottom, 4).map(top => <BoardBonusTokenTrack top={top} />),
    ];
}
