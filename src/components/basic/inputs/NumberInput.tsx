import React, { useState } from 'react';
import { Text, TextInput, TouchableNativeFeedback, View } from "react-native";
import { NumberInputStyle as getStyles } from "../../../AppStyle";
import { useTheme } from "../../../theme";

type NumberInputProps = {
    onChange: (val: number) => void,
    value: number,
    minVal?: number,
    maxVal?: number,
    measure?: string,
    measurePlural?: string,
};

export const NumberInput = (props: NumberInputProps) => {
    const [value, updateValue] = useState(props.value);
    const [isEditing, setIsEditing] = useState(false);

    const colors = useTheme().colors;
    const styles = getStyles(colors);

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

    const onSubmit = (a: { nativeEvent: { text: string } }) => {
        const val = validateVal(a.nativeEvent.text);
        props.onChange(val);
        updateValue(val);
        setIsEditing(false);
    };

    const inc = () => {
        props.onChange(value + 1);
        updateValue(value + 1);
    };

    const dec = () => {
        props.onChange(value - 1);
        updateValue(value - 1);
    };

    return (
        <View style={styles.wrap}>
            <PlusButton onPress={inc}/>
            <View style={styles.inputWrap}>
                <TextInput style={styles.input}
                           keyboardType='numeric'
                           onSubmitEditing={onSubmit}
                           onFocus={() => setIsEditing(true)}
                           onBlur={() => setIsEditing(false)}
                           onChangeText={(val) => updateValue(val === undefined ? val : Number(val))}
                           value={value !== undefined ? value.toString() : undefined}/>
                {props.measure !== undefined ?
                    <Text style={styles.text}>{getMeasure(props.value, props.measure, props.measurePlural)}</Text>
                    : undefined}
            </View>
            <MinusButton onPress={dec}/>
        </View>
    );
};

const getMeasure = (val: number, one: string, plural?: string) =>
    val > 1 ? (plural !== undefined ? plural : one + 's') : one;

const PlusButton = (props: { onPress: () => void }) => {
    const styles = getStyles(useTheme().colors);

    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <View style={styles.numberBtn}>
                <Text style={styles.btnText}>+</Text>
            </View>
        </TouchableNativeFeedback>
    );
};

const MinusButton = (props: { onPress: () => void }) => {
    const styles = getStyles(useTheme().colors);

    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <View style={styles.numberBtn}>
                <Text style={styles.btnText}>-</Text>
            </View>
        </TouchableNativeFeedback>
    );
};
