import React, { useState } from 'react';
import { Text, View } from "react-native";
import { DurationInputStyle as getStyles } from "../../../AppStyle";
import { useTheme } from "../../../theme";
import { getHours, getMinutes, Time, toMinutes } from "../../../utils/time";
import { NumberInput } from "./NumberInput";

type InputProps = {
    minutes: number,
    onChange: (min: number) => void,
};

export const DurationInput = (props: InputProps) => {
    const [dur, setDur] = useState<Time>({ m: getMinutes(props.minutes), h: getHours(props.minutes) });

    const setMin = (min: number) => {
        setDur({ m: getMinutes(min), h: dur.h + getHours(min) });
        props.onChange(toMinutes(dur))
    };

    const setHour = (h: number) => {
        setDur({ m: dur.m, h });
        props.onChange(toMinutes(dur))
    };

    const styles = getStyles(useTheme().colors);

    return (
        <View style={styles.wrap}>
            <NumberInput onChange={setHour} value={dur.h} minVal={0} maxVal={8}/>
            <Text style={styles.textStyle}>h</Text>
            <NumberInput onChange={setMin} value={dur.m} minVal={dur.h > 0 ? 0 : 1} maxVal={480}/>
            <Text style={styles.textStyle}>min</Text>
        </View>
    );
};
