import React from "react";
import { Text, View } from "react-native";
import { ActivityType } from "../../types/Activity";

type TimerActivityTitle = {
    small?: string,
    main: string
};

export const SessionActivityTitle = (props: { title: { main: string, small?: string }, color?: string }) => (
    <View style={{
        marginBottom: 30,
        marginTop: 150,
        alignSelf: 'center',
        alignItems: 'center'
    }}>
        {props.title.small !== undefined ? <SmallTitle color={props.color}>{props.title.small}</SmallTitle> : undefined}
        <Text style={{
            fontSize: 35,
            letterSpacing: 1.2,
            color: props.color !== undefined ? props.color : 'black',
            textAlign: 'center',
        }}>
            {props.title.main}
        </Text>
    </View>
);

const SmallTitle = (props: { children: string, color?: string }) => (
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
    if (activityType === ActivityType.WarmUp) {
        return {
            main: 'Warm-up',
        }
    }

    return {
        small: 'polishing',
        main: activityType,
    };
};

export const getFreeSessionActivityTitle = (activityType: ActivityType): TimerActivityTitle => {
    return {
        small: 'time for',
        main: activityType
    }
};
