// @ts-ignore
import { StyleSheet, Dimensions, useWindowDimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export function RANGE(lo: number, hi: number, len: number) {
    return new Array<number>(len).fill(null).map((_, i) => lo + i * (hi - lo) / (len - 1));
}

const styles = EStyleSheet.create({
    mat: {
        flex: 1,
        backgroundColor: "#446983",
    },
});

export default styles;