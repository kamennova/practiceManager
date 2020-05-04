import React from "react";
import { Text, View } from "react-native";
import { TimeTrackerTextStyle } from "../../../AppStyle";
import { ActivityType } from "../../../types/Activity";
import { formatSeconds } from "../../../utils/time";
import { getActivityColor } from "../../SessionTimer/Colors";

type TimeTrackerProps = {
    seconds: number,
    activityType: ActivityType,
}

export const TimeTracker = (props: TimeTrackerProps) => {
    const showHours = props.seconds / 3600 >= 1;
    const color = getActivityColor(props.activityType);

    return (
        <View style={{ marginTop: 50 }}>
            <Text style={{ ...TimeTrackerTextStyle, color: color }}>
                {showHours ? formatSeconds(Math.floor(props.seconds / 3600)) + ':' : undefined}
                {formatSeconds(Math.floor((props.seconds / 60) % 60))}:
                {formatSeconds(props.seconds % 60)}
            </Text>
        </View>
    );
};
