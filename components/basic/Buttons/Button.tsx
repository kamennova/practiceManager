import React from 'react';
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { ButtonStyle } from "../../../AppStyle";
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
