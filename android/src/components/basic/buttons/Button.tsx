import React from 'react';
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { ActionBtnStyle as styles, MinorButtonStyle } from "../../../AppStyle";

type ButtonProps = {
    label?: string,
    style?: ViewStyle,
    textStyle?: TextStyle,
    onPress?: () => void,
    icon?: JSX.Element,
}

export const Button = (props: ButtonProps) => {
    const wrapStyle = { ...styles.wrap, paddingLeft: props.icon !== undefined ? 19 : 24, ...props.style };

    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={wrapStyle}>
                {props.icon}
                <Text style={styles.text}>{props.label}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

export const MinorButton = (props: ButtonProps & { style?: TextStyle, children?: string }) => (
    <TouchableWithoutFeedback onPress={props.onPress}>
        <Text style={{ ...MinorButtonStyle, ...props.style }}>
            {props.children}
        </Text>
    </TouchableWithoutFeedback>
);
