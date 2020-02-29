import React from "react";
import { Text } from "react-native";
import { ActivityType } from "../../types/Activity";

export const SessionTimerTitle = (props: { activity: ActivityType }) => (
    <Text style={{
        marginBottom: 30,
        fontSize: 35,
        textAlign: 'center',
    }}>
        {getActivityTitle(props.activity)}
    </Text>
);

const getActivityTitle = (activityType: ActivityType): string => {
    return 'Time for ' + activityType;
};
