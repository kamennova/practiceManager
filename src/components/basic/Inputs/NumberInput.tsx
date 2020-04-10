import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from "react-native";
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

    return (
        <View style={styles.wrap}>
            <PlusButton onPress={() => updateValue(value + 1)}/>
            <View style={styles.inputWrap}>
                <TextInput style={{ ...styles.input, borderColor: isEditing ? 'lightgrey' : 'transparent', }}
                           keyboardType='numeric'
                           onSubmitEditing={onSubmit}
                           onFocus={() => setIsEditing(true)}
                           onBlur={() => setIsEditing(false)}
                           onChangeText={(val) => updateValue(val === undefined ? val : Number(val))}
                           value={value !== undefined ? value.toString() : undefined}/>
                {props.measure !== undefined ?
                    <Text>{getMeasure(props.value, props.measure, props.measurePlural)}</Text>
                    : undefined}
            </View>
            <MinusButton onPress={() => updateValue(value - 1)}/>
        </View>
    );
};

const getMeasure = (val: number, one: string, plural?: string) =>
    val > 1 ? (plural !== undefined ? plural : one + 's') : one;

const PlusButton = (props: { onPress: () => void }) => {
    const styles = getStyles(useTheme().colors);

    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.numberBtn}>
                <Text style={styles.btnText}>+</Text>
            </View>
        </TouchableOpacity>
    );
};

const MinusButton = (props: { onPress: () => void }) => {
    const styles = getStyles(useTheme().colors);

    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.numberBtn}>
                <Text style={styles.btnText}>-</Text>
            </View>
        </TouchableOpacity>
    );
};
