import React, { useState } from 'react';
import { Text, View, StyleSheet } from "react-native";
import { useTheme } from "../../../theme";
import { ThemeColors } from "../../../theme";
import { NumberInput } from "./NumberInput";

export const DurationInput = (props: { minutes: number, onChange: (min: number) => void }) => {
    const [dur, setDur] = useState({ m: props.minutes % 60, h: Math.floor(props.minutes / 60) });

    const setMin = (min: number) => {
        setDur({ m: min % 60, h: dur.h + Math.floor(min / 60) });
        props.onChange(dur.m + dur.h * 60)
    };

    const setHour = (h: number) => {
        setDur({ m: dur.m, h });
        props.onChange(dur.m + dur.h * 60)
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

const getStyles = (colors: ThemeColors) => StyleSheet.create({
    wrap: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 16,
        color: colors.color,
        marginLeft: 5,
        marginRight: 12,
    },
});
