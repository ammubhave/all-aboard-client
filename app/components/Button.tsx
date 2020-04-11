import React from 'react';
import { StyleProp, ViewStyle, View, Text, TouchableOpacity, GestureResponderEvent } from "react-native";

const Button: React.FunctionComponent<{
    flip?: boolean,
    title: string,
    disabled?: boolean,
    onPress?: (event: GestureResponderEvent) => void,
    style?: StyleProp<ViewStyle>,
}> = (props) => {
    const RootElement: React.FunctionComponent<{ style: StyleProp<ViewStyle>; }> = (rootProps) => {
        return !props.disabled ?
            <TouchableOpacity style={rootProps.style} onPress={props.onPress}>{rootProps.children}</TouchableOpacity> :
            <View style={rootProps.style}>{rootProps.children}</View>;
    };


    return <RootElement
        style={[{
            backgroundColor: props.disabled ? "grey" : "#7a42f4",
            flex: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            margin: 5,
            borderRadius: 5,
            borderWidth: 3,
        }, props.style]}
    >
        <Text style={{
            flex: 1,
            color: "white",
            fontWeight: "500",
            fontSize: 19,
            textAlign: "center",
            padding: 4,
        }}>
            {props.title}
        </Text>
    </RootElement>;
};

export default Button;