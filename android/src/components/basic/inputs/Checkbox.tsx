import React from 'react';
import { CheckBox, Text, TouchableWithoutFeedback, View } from "react-native";
import { CheckboxStyle, CheckboxWrapperStyle } from "../../../AppStyle";

type CheckboxProps = {
    title?: string,
    value: boolean,
    onValueChange: () => void,
}

export const MyCheckbox = (props: CheckboxProps) => {
    return (
        <TouchableWithoutFeedback onPress={props.onValueChange}>
            <View
                style={{
                    ...CheckboxWrapperStyle,
                }}>
                <CheckBox value={props.value} onValueChange={props.onValueChange} style={{ ...CheckboxStyle }}/>
                <Text style={{ fontSize: 17 }}>{props.title}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};
