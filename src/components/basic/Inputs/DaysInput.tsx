import React, { useState } from 'react';
import { TextInput } from "react-native";
import { DaysInputStyle } from "../../../AppStyle";

type DaysInputProps = {
    onChange: (val: number) => void,
    minVal?: number,
    maxVal?: number,
    value?: number,
}

export const DaysInput = (props: DaysInputProps) => {
    const [value, updateValue] = useState(props.value);

    const validateVal = (val: string | undefined): number => {
        const numVal = Number(val);

        if (props.minVal !== undefined && numVal < props.minVal) {
            return props.minVal;
        }

        if (props.maxVal !== undefined && numVal > props.maxVal) {
            return props.maxVal;
        }

        return numVal;
    };

    return (
        <TextInput style={{ ...DaysInputStyle }} keyboardType={'numeric'}
                   onSubmitEditing={({ nativeEvent: { text } }) => {
                       props.onChange(validateVal(text));
                       updateValue(validateVal(text));
                   }}
                   onChangeText={(val) => {
                       updateValue(val === undefined ? val : Number(val));
                   }}
                   value={value !== undefined ? value.toString() : undefined}/>
    );
};
