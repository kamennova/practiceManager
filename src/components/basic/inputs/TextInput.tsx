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
    lines?: number,
};

export const MyTextInput = (props: InputProps) => {
    const colors = useTheme().colors;
    const styles = {
        ...TextInputStyle(colors), borderColor: props.isRequired ? Dark : colors.borderFaded, ...props.style
    };

    return (
        <FormInputWrap label={props.label}>
            <TextInput numberOfLines={props.lines}
                       multiline={props.lines !== undefined && props.lines > 1}
                       style={styles}
                       value={props.value}
                       textAlignVertical={'top'}
                       autoFocus={props.autoFocus}
                       onChangeText={props.onChangeText}
                       placeholder={props.placeholder}
                       placeholderTextColor={colors.colorFaded}
                       keyboardType={props.keyboardType}/>
        </FormInputWrap>
    )
};

