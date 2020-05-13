import React from 'react';
import { Text, TextStyle, TouchableWithoutFeedback, View } from "react-native";
import { ActionBtnStyle as styles, MinorButtonStyle } from "../../../AppStyle";
import { ButtonProps } from "./ButtonProps";

export const Button = (props: ButtonProps) => (
    <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={{ ...styles.wrap, paddingLeft: props.icon !== undefined ? 19 : 24, ...props.style }}>
            {props.icon}
            <Text style={styles.text}>{props.label}</Text>
        </View>
    </TouchableWithoutFeedback>
);

export const MinorButton = (props: ButtonProps & { style?: TextStyle, children?: string }) => (
    <TouchableWithoutFeedback onPress={props.onPress}>
        <Text style={{ ...MinorButtonStyle, ...props.style }}>
            {props.children}
        </Text>
    </TouchableWithoutFeedback>
);
