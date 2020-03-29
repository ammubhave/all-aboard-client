// @ts-ignore
import { StyleSheet, Dimensions, useWindowDimensions } from 'react-native';
import { theme } from "../../modules/home/index"
export const { padding, color, fontSize, fontFamily } = theme;

export function WIDTH(scale_pct?: number) {
    if (scale_pct === null || scale_pct === undefined) { return undefined; }
    return scale_pct + "%";
    // return useWindowDimensions().width * scale_pct / 100;
}
export function HEIGHT(scale_pct?: number) {
    if (scale_pct === null || scale_pct === undefined) { return undefined; }
    return scale_pct + "%";
    // return useWindowDimensions().height * scale_pct / 100;
}
export function MIN_WIDTH_HEIGHT(scale_pct?: number) {
    return Math.min(Dimensions.get('window').width, Dimensions.get('window').height) * scale_pct / 100;
    // return Math.min(useWindowDimensions().height, useWindowDimensions().width) * scale_pct / 100;
}

export function RANGE(lo: number, hi: number, len: number) {
    return new Array<number>(len).fill(null).map((_, i) => lo + i * (hi - lo) / (len - 1));
}

const styles = StyleSheet.create({
    mat: {
        flex: 1,
        backgroundColor: "#5aa57c",
    },
    mat_strips: {
        backgroundColor: "#458779",
        height: "4%",
        position: "absolute",
    },
    mat_strip_circle: {
        backgroundColor: "#458779",
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.07,
        height: Dimensions.get('window').width * 0.07,
        position: "absolute",
    },
    mat_card: {
        position: "absolute",
        backgroundColor: "#4ca68a",
        borderColor: "#448c72",
        borderWidth: 3,
        borderRadius: 15,
        width: "10%",
        height: "20%",
        paddingHorizontal: "5%",
        paddingTop: "5%",
        paddingBottom: "2%",
    },
    mat_discard_pile: {
        position: "relative",
        backgroundColor: "rgba(89,90,79,0.5)",
        flex: 1,
        borderRadius: 15,
        textAlign: "center",
        textAlignVertical: "center",
    },
    mat_card_glow: {
        shadowColor: "gold",
        shadowRadius: 15,
        shadowOpacity: 0.6
    },
    mat_grey_cover: {
        backgroundColor: "#595a4f",
        right: "2%",
        width: "11%",
        height: "65%",
        top: "20%",
        position: "absolute",
    },
    mat_goods_token_track: {
        position: "absolute",
        backgroundColor: "#5aa57c",
        borderColor: "#448c72",
        borderWidth: 5,
        right: "10%",
        height: Dimensions.get('window').width * 0.06,
        width: "17%",
        borderRadius: Math.round(Dimensions.get('window').height) * 0.1 / 2,
    },
    mat_bonus_token_track: {
        position: "absolute",
        backgroundColor: "black",
        borderColor: "gold",
        borderWidth: 3,
        right: "3%",
        width: Dimensions.get('window').width * 0.06,
        height: Dimensions.get('window').width * 0.06,
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    },
    card: {
        position: "absolute",
        width: "10%",
        height: "20%",
        // width: Dimensions.get('window').width * 0.1,
        // height: Dimensions.get('window').width * 0.2,
        borderWidth: 1,
        borderRadius: 15,
        shadowColor: "black",
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        backgroundColor: "white",
        padding: "6%",
        paddingTop: "7%",
        paddingBottom: "3%",
    },
    token: {
        borderWidth: 1,
        borderColor: "black",
        shadowColor: "black",
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        overflow: "hidden",
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.06,
        height: Dimensions.get('window').width * 0.06,
        position: "absolute",
    },
    buttonPanel: {
        position: "absolute",
        left: "17%",
        height: "4.5%",
        width: "54%",
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
    },
    goodsTokenTrack: {
        top: 20,
        bottom: 76.7,
    },
    bonusTokenTrack: {
        top: 30,
        bottom: 67,
    }
});

export default styles;