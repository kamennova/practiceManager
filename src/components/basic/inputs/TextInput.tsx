import React from 'react';
import { TextInput, ViewStyle } from "react-native";
import { Dark, TextInputStyle } from "../../../AppStyle";
import { useTheme } from "../../../theme";
import { FormInputWrap } from "./FormInputWrap";

type InputProps = {
    autoFocus?: boolean,
    onChangeText: (text: string) => void,
    isRequired?: boolean,
    value?: string,
    label?: string,
    placeholder?: string,
    style?: ViewStyle,
    keyboardType?: 'default' | 'numeric';
};

export const MyTextInput = (props: InputProps) => {
    const colors = useTheme().colors;
    const styles = {
        ...TextInputStyle(colors), borderColor: props.isRequired ? Dark : colors.borderFaded, ...props.style
    };

    return (
        <FormInputWrap label={props.label}>
            <TextInput style={styles}
                       value={props.value}
                       autoFocus={props.autoFocus}
                       onChangeText={props.onChangeText}
                       placeholder={props.placeholder}
                       placeholderTextColor={colors.colorFaded}
                       keyboardType={props.keyboardType}/>
        </FormInputWrap>
    )
};

