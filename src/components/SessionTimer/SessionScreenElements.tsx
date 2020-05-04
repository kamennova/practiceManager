import React from "react";
import { Text, View } from "react-native";
import { Activity, ActivityType } from "../../types/Activity";
import { getActivityColor } from "./Colors";

type TimerActivityTitle = {
    small?: string,
    main: string
};

export const SessionActivityTitle = (props: { activity: Activity }) => {
    return (
        <View style={{
            marginBottom: 30,
            marginTop: 150,
            alignSelf: 'center',
            alignItems: 'center'
        }}>
            <Text style={{
                fontSize: 35,
                color: getActivityColor(props.activity.type),
                textAlign: 'center',
            }}>
                {props.activity.type}
            </Text>
            {/*{props.title.small !== undefined ?*/}
                {/*<SmallTitle color={props.color}>{props.title.small}</SmallTitle> : undefined}*/}
        </View>
    );
};

export const SmallTitle = (props: { children: string, color?: string }) => (
    <Text style={{
        width: '100%',
        marginBottom: 7,
        textAlign: 'center',
        fontSize: 12,
        color: props.color !== undefined ? props.color : 'black',
        letterSpacing: 2,
        textTransform: 'uppercase',
    }}>
        {props.children}
    </Text>
);

export const getPlannedSessionActivityTitle = (activityType: ActivityType): TimerActivityTitle => {
    return {
        small: 'time for',
        main: activityType
    }
};

export const getFreeSessionActivityTitle = (activityType: ActivityType): TimerActivityTitle => {
    return {
        small: activityType !== ActivityType.Break ? 'polishing' : 'time for',
        main: activityType,
    };
};
