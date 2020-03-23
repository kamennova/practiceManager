import React from 'react';
import { Text, TextStyle, TouchableWithoutFeedback, View } from "react-native";
import { ButtonStyle, MinorButtonStyle, PrimaryButtonStyle, PrimaryButtonTextStyle } from "../../../AppStyle";
import { ButtonProps } from "./ButtonProps";

export const Button = (props: ButtonProps) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={{
                ...ButtonStyle,
                ...props.style,
            }}>
                <Text style={{
                    fontSize: 19,
                    ...props.textStyle,
                }}>
                    {props.children}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

export const PrimaryButton = (props: ButtonProps) => (
    <Button {...props} style={{ ...PrimaryButtonStyle, ...props.style, }} textStyle={{...PrimaryButtonTextStyle}} children={props.children}/>);

export const MinorButton = (props: ButtonProps & { style?: TextStyle }) => (
    <TouchableWithoutFeedback onPress={props.onPress}>
        <Text style={{ ...MinorButtonStyle, ...props.style }}>
            {props.children}
        </Text>
    </TouchableWithoutFeedback>
);
