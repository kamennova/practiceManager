import React from 'react';
import { Picker, PickerItem, View, ViewStyle } from "react-native";
import { PickerStyle, PickerWrapperStyle } from "../../../AppStyle";
import { useTheme } from "../../../theme";

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
    const colors = useTheme().colors;

    return (
        <View style={{ ...PickerWrapperStyle(colors), ...props.wrapperStyle }}>
            <Picker
                enabled={props.enabled}
                mode='dropdown'
                onValueChange={props.onValueChange}
                selectedValue={props.selected}
                style={{ ...PickerStyle(colors), ...props.style }}
                itemStyle={{ backgroundColor: colors.appBg, color: colors.color, ...props.itemStyle }}>
                {props.items.map(item => <PickerItem label={item.label} value={item.val}/>)}
            </Picker>
        </View>
    );
};
