import React from 'react';
import { Picker, PickerItem, View, ViewStyle } from "react-native";
import { PickerStyle, PickerWrapperStyle } from "../../../AppStyle";

type PickerProps = {
    items: { val: any, label: string }[],
    onValueChange: (val: any) => void,
    selected: any,
    style?: ViewStyle & { color?: string },
    wrapperStyle?: ViewStyle,
    itemStyle?: ViewStyle & { color?: string, fontSize?: number },
    enabled?: boolean,
}

export const MyPicker = (props: PickerProps) => {
    return (
        <View style={{ ...PickerWrapperStyle, ...props.wrapperStyle }}>
            <Picker
                enabled={props.enabled}
                mode='dropdown'
                onValueChange={props.onValueChange}
                selectedValue={props.selected}
                style={{ ...PickerStyle, ...props.style }}
                itemStyle={{ ...props.itemStyle }}>
                {props.items.map(item => <PickerItem label={item.label} value={item.val}/>)}
            </Picker>
        </View>
    );
};
