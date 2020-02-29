import React from 'react';
import { TouchableWithoutFeedback, View } from "react-native";
import { ButtonStyle } from "../../../AppStyle";
import { ButtonProps } from "./ButtonProps";

export const Button = (props: ButtonProps) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={{
                ...ButtonStyle,
                ...props.style,
                backgroundColor: 'red'
            }}>
                {/*<Text>*/}
                {props.children}
                {/*</Text>*/}
            </View>
        </TouchableWithoutFeedback>
    );
};
