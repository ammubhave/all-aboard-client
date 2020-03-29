import { StyleSheet } from 'react-native';
import { theme } from "../../modules/home/index"
export const { padding, color, fontSize, fontFamily } = theme;
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});

export default styles;