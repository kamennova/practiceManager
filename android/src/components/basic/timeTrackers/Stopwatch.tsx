import React from 'react';
import { Text, View } from "react-native";
import { TimeTrackerTextStyle } from "../../../AppStyle";
import { formatSeconds } from "../../../types/Time";
import { useDeviceSize } from "../adaptive/query";

type StopwatchProps = {
    seconds: number,
};

export const Stopwatch = (props: StopwatchProps) => {
    const showHours = props.seconds / 3600 >= 1;

    return (
        <View>
            <Text style={TimeTrackerTextStyle(useDeviceSize())}>
                {showHours ? formatSeconds(Math.floor(props.seconds / 3600)) + ':' : undefined}
                {formatSeconds(Math.floor((props.seconds / 60) % 60))}:
                {formatSeconds(props.seconds % 60)}
            </Text>
        </View>
    );
};
