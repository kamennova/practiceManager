import React, { useState } from 'react';
import { Text, TextInput, View } from "react-native";
import { DaysInputStyle } from "../../../AppStyle";
import { useTheme } from "../../../theme";

type DaysInputProps = {
    onChange: (val: number) => void,
    value: number,
    minVal?: number,
    maxVal?: number,
    measure?: string,
    measurePlural?: string,
}

export const NumberInput = (props: DaysInputProps) => {
    const [value, updateValue] = useState(props.value);

    const colors = useTheme().colors;

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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput style={{ ...DaysInputStyle(colors) }}
                       keyboardType={'numeric'}
                       onSubmitEditing={({ nativeEvent: { text } }) => {
                           props.onChange(validateVal(text));
                           updateValue(validateVal(text));
                       }}
                       onChangeText={(val) => {
                           updateValue(val === undefined ? val : Number(val));
                       }}
                       value={value !== undefined ? value.toString() : undefined}/>
            {props.measure !== undefined ?
                <Text style={{color: colors.colorFaded}}>{getMeasure(props.value, props.measure, props.measurePlural)}</Text>
                : undefined}
        </View>
    );
};

const getMeasure = (val: number, one: string, plural?: string) =>
    val > 1 ? (plural !== undefined ? plural : one + 's') : one;
