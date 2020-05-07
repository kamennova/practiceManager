import React from "react";
import { Text, View, ViewStyle } from "react-native";
import { LabelStyle } from "../../../AppStyle";
import { useTheme } from "../../../theme";

type WrapProps = {
    label?: string,
    children: JSX.Element | (JSX.Element | undefined)[],
    style?: ViewStyle,
}

export const FormInputWrap = (props: WrapProps) => (
    <View style={props.style}>
        {props.label !== undefined ? <Text style={LabelStyle(useTheme().colors)}>{props.label}</Text> : undefined}
        {props.children}
    </View>
);
