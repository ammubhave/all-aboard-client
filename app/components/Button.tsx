import React from 'react';
import { StyleProp, ViewStyle, View, Text, TouchableOpacity, GestureResponderEvent } from "react-native";

const Button: React.FunctionComponent<{
    flip?: boolean,
    title: string,
    disabled?: boolean,
    onPress?: (event: GestureResponderEvent) => void,
}> = (props) => {
    const RootElement: React.FunctionComponent<{ style: StyleProp<ViewStyle>; }> = (rootProps) => {
        return !props.disabled ?
            <TouchableOpacity style={rootProps.style} onPress={props.onPress}>{rootProps.children}</TouchableOpacity> :
            <View style={rootProps.style}>{rootProps.children}</View>;
    };


    return <RootElement
        style={{
            backgroundColor: props.disabled ? "grey" : "#7a42f4",
            flex: 1,
            display: "flex",
            borderRadius: 4,
            margin: 5,
        }}
    >
        <Text style={{
            flex: 1,
            color: "white",
            fontWeight: "800",
            fontSize: 19,
            textAlign: "center",
            textAlignVertical: "center",
            borderWidth: 3,
            borderRadius: 5,
            padding: 4,
            borderColor: 'black',
        }}>
            {props.title}
        </Text>
    </RootElement>;
};

export default Button;