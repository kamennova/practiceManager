import React from "react";
import { Text, View } from "react-native";
import { TimeTrackerTextStyle } from "../../../AppStyle";
import { ActivityType } from "../../../types/activity/Activity";
import { formatSeconds } from "common/utils/time";
import { getActivityColor } from "../../SessionTimer/Colors";

type TimeTrackerProps = {
    seconds: number,
    activityType: ActivityType,
}

export const TimeTracker = (props: TimeTrackerProps) => {
    const hours = Math.floor(props.seconds / 3600);
    const color = getActivityColor(props.activityType);

    return (
        <View style={{ marginTop: 50, marginBottom: 30 }}>
            <Text style={{ ...TimeTrackerTextStyle, color: color }}>
                {hours > 0 ? formatSeconds(hours) + ':' : undefined}
                {formatSeconds(Math.floor(props.seconds / 60) % 60)}:
                {formatSeconds(props.seconds % 60)}
            </Text>
        </View>
    );
};
