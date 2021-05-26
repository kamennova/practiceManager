import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "../../../theme";
import { useDeviceSize } from "../adaptive/query";
import { NumberInput } from "./NumberInput";
import { DurationInputStyle as getStyles } from "../../../AppStyle";

export const DaysInput = (props: { interval: number, updateInterval: (_: number) => void }) => {
    const textStyle = getStyles(useTheme().colors, useDeviceSize()).textStyle;

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <NumberInput
                value={props.interval}
                onChange={props.updateInterval}
                minVal={1} maxVal={100}/>
            <Text style={textStyle}>day{props.interval > 1 ? 's' : ''}</Text>
        </View>
    );
};
