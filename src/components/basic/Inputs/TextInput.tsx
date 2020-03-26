import React from 'react';
import { TextInput, ViewStyle } from "react-native";
import { TextInputStyle } from "../../../AppStyle";

type InputProps = {
    autoFocus?: boolean,
    onChangeText: (text: string) => void,
    value?: string,
    placeholder?: string,
    style?: ViewStyle,
    keyboardType?: 'default' | 'numeric';
};

export const MyTextInput = (props: InputProps) => (
    <TextInput style={{ ...TextInputStyle, ...props.style }}
               value={props.value}
               autoFocus={props.autoFocus}
               onChangeText={props.onChangeText}
               placeholder={props.placeholder}
               placeholderTextColor={'grey'}
               keyboardType={props.keyboardType}
    />
);
