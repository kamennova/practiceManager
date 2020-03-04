import React from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";
import { TimeTrackerTextStyle } from "../../../AppStyle";
import { formatSeconds } from "../../../types/Time";

type TimeTrackerProps = {
    seconds: number,
    style?: ViewStyle,
    textStyle?: TextStyle
}

export const TimeTracker = (props: TimeTrackerProps) => {
    const showHours = props.seconds / 3600 >= 1;

    return (
        <View style={{ ...props.style }}>
            <Text style={{ ...TimeTrackerTextStyle, ...props.textStyle }}>
                {showHours ? formatSeconds(Math.floor(props.seconds / 3600)) + ':' : undefined}
                {formatSeconds(Math.floor((props.seconds / 60) % 60))}:
                {formatSeconds(props.seconds % 60)}
            </Text>
        </View>
    );
};
