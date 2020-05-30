import React from 'react';
import { Text, View } from "react-native";
import { DurationInputStyle as getStyles } from "../../../AppStyle";
import { useTheme } from "../../../theme";
import { getHours, getMinutes } from "../../../utils/time";
import { NumberInput } from "./NumberInput";

type InputProps = {
    minutes: number,
    onChange: (min: number) => void,
};

export const DurationInput = (props: InputProps) => {
    const hours = getHours(props.minutes);
    const minutes = getMinutes(props.minutes);

    const setMin = (min: number) => props.onChange(60 * getHours(props.minutes) + min);
    const setHour = (h: number) => props.onChange(h * 60 + props.minutes % 60);

    const styles = getStyles(useTheme().colors);

    return (
        <View style={styles.wrap}>
            <Text>{props.minutes}</Text>
            <NumberInput onChange={setHour} value={hours} minVal={0} maxVal={8}/>
            <Text style={styles.textStyle}>h</Text>
            <NumberInput onChange={setMin} value={minutes} minVal={hours > 0 ? 0 : 1} maxVal={59}/>
            <Text style={styles.textStyle}>min</Text>
        </View>
    );
};
