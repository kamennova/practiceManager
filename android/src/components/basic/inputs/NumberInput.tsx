import React from 'react';
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
    const colors = useTheme().colors;
    const styles = getStyles(colors);

    const validateVal = (val: number): number => {
        if (props.minVal !== undefined && val < props.minVal) {
            return props.minVal;
        }

        if (props.maxVal !== undefined && val > props.maxVal) {
            return props.maxVal;
        }

        return val;
    };

    const onSubmit = (a: { nativeEvent: { text: string } }) => onChange(Number(a.nativeEvent.text));

    const onChange = (value: number) => props.onChange(validateVal(value));

    const inc = () => onChange(props.value + 1);
    const dec = () => onChange(props.value - 1);

    return (
        <View style={styles.wrap}>
            <MinusButton onPress={dec}/>
            <View style={styles.inputWrap}>
                <TextInput style={styles.input}
                           keyboardType='numeric'
                           onSubmitEditing={onSubmit}
                           onChangeText={(val) => onChange(val !== '' ? Number(val) : 0)}
                           value={props.value.toString()}/>
                {props.measure !== undefined ?
                    <Text style={styles.text}>{getMeasure(props.value, props.measure, props.measurePlural)}</Text>
                    : undefined}
            </View>
            <PlusButton onPress={inc}/>
        </View>
    );
};

const getMeasure = (val: number, one: string, plural?: string) =>
    val > 1 ? (plural !== undefined ? plural : one + 's') : one;

const PlusButton = (props: { onPress: () => void }) => {
    const styles = getStyles(useTheme().colors);

    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <View style={{ ...styles.numberBtn, borderTopRightRadius: 3, borderBottomRightRadius: 3 }}>
                <Text style={{ ...styles.btnText, fontSize: 13 }}>+</Text>
            </View>
        </TouchableNativeFeedback>
    );
};

const MinusButton = (props: { onPress: () => void }) => {
    const styles = getStyles(useTheme().colors);

    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <View style={{ ...styles.numberBtn, borderTopLeftRadius: 3, borderBottomLeftRadius: 3 }}>
                <Text style={styles.btnText}>-</Text>
            </View>
        </TouchableNativeFeedback>
    );
};
