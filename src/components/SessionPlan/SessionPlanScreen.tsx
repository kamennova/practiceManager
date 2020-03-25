import React from 'react';
import { Route, Text, View } from "react-native";
import { ActivityViewStyle, AppPaddingStyle, BreakViewStyle, SubActivityViewStyle } from "../../AppStyle";
import { ActivityType, ComplexActivity, SimpleActivity, SubActivity } from "../../types/Activity";
import { SessionPlan, SessionSchedule } from "../../types/SessionPlan";
import { StartButton } from "../basic/Buttons/StartButton";
import { ScreenWrapper } from "../basic/ScreenWrapper";

type SessionPlanProps = {
    plan: SessionPlan,
    route: Route
};

export const SessionPlanScreen = (props: SessionPlanProps) => {
    const plan: SessionPlan = props.route.params.plan;

    return (
        <ScreenWrapper title={plan.name}>
            <View style={{
                ...AppPaddingStyle
            }}>
                <StartButton/>
                <Text style={{
                    color: 'grey',
                    fontSize: 16,
                }}>
                    Total duration: {plan.totalDurationInMinutes()} minutes
                </Text>
                <SessionScheduleView schedule={plan.schedule}/>
            </View>
        </ScreenWrapper>
    );
};

const SessionScheduleView = (props: { schedule: SessionSchedule }) => {
    return (
        <View style={{
            marginTop: 20
        }}>
            {props.schedule.map(activity => <ActivityView activity={activity}/>)}
        </View>
    );
};

const ActivityView = (props: { activity: SimpleActivity | ComplexActivity }) => {
    const bg = getActivityColor(props.activity.type);
    const otherStyles = props.activity.type === ActivityType.Break ? BreakViewStyle : {};

    return (
        <View style={{
            ...ActivityViewStyle,
            ...otherStyles,
            backgroundColor: bg,
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Text style={{
                    fontSize: 18,
                }}>
                    {props.activity.type}
                </Text>
                <Text style={{
                    fontSize: 15,
                    color: 'rgb(0, 0, 12)',
                    marginLeft: 'auto',
                }}>
                    {props.activity.duration} min
                </Text>
            </View>

            {((props.activity.type === ActivityType.Pieces || props.activity.type === ActivityType.Technique)
                && props.activity.schedule !== undefined && props.activity.schedule.length > 0) ?
                <SubActivities schedule={props.activity.schedule}/> : undefined}
        </View>
    );
};

const SubActivities = (props: { schedule: SubActivity[] }) => {
    return (
        <View style={{
            paddingTop: 10,
        }}>
            {props.schedule.map(sub => <SubActivityView {...sub}/>)}
        </View>
    );
};

const SubActivityView = (props: SubActivity) => (
    <View style={{
        ...SubActivityViewStyle,
        flexDirection: 'row',
        alignItems: 'center'
    }}>
        <Text>
            {props.name}
        </Text>
        <Text style={{
            fontSize: 14,
            marginLeft: 'auto'
        }}>
            {props.duration} min
        </Text>
    </View>
);

const getActivityColor = (activity: ActivityType): string => {
    switch (activity) {
        case ActivityType.Break:
            return 'transparent';
        case ActivityType.WarmUp:
            return '#ffac8c';
        case ActivityType.Pieces:
            return '#d0dbff';
        case ActivityType.Technique:
            return '#b3d4d6';
        case ActivityType.SightReading:
            return 'brown';
    }
};
