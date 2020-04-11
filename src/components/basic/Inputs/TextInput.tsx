import React from 'react';
import { TextInput, ViewStyle } from "react-native";
import { Dark, TextInputStyle } from "../../../AppStyle";
import { useTheme } from "../../../theme";

type InputProps = {
    autoFocus?: boolean,
    onChangeText: (text: string) => void,
    isRequired?: boolean,
    value?: string,
    placeholder?: string,
    style?: ViewStyle,
    keyboardType?: 'default' | 'numeric';
};

export const MyTextInput = (props: InputProps) => {
    const colors = useTheme().colors;

    return (
    <TextInput style={{ ...TextInputStyle(colors), borderColor: props.isRequired ? Dark : colors.borderFaded, ...props.style }}
               value={props.value}
               autoFocus={props.autoFocus}
               onChangeText={props.onChangeText}
               placeholder={props.placeholder}
               placeholderTextColor={colors.colorFaded}
               keyboardType={props.keyboardType} />
)};
