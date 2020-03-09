import React from 'react';
import { CheckBox, Text, View } from "react-native";
import { CheckboxStyle, CheckboxWrapperStyle } from "../../../AppStyle";

type CheckboxProps = {
    title?: string,
    value?: boolean,
    onValueChange: () => void,
}

export const MyCheckbox = (props: CheckboxProps) => (
    <View style={{
        ...CheckboxWrapperStyle,
    }}>
        <CheckBox style={{ ...CheckboxStyle }}/>
        <Text style={{fontSize: 16}}>{props.title}</Text>
    </View>
);
