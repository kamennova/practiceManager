import React from 'react';
import { Route, Text, View } from "react-native";
import { ActivityViewStyle, AppPaddingStyle, BreakViewStyle } from "../../AppStyle";
import { ActivityType } from "../../types/Activity";
import { PlanActivity } from "../../types/PlanActivity";
import { SessionPlan, SessionSchedule, totalDurationInMinutes } from "../../types/SessionPlan";
import { StartButton } from "../basic/Buttons/StartButton";
import { ScreenWrapper } from "../basic/ScreenWrapper";

type SessionPlanProps = {
    plan: SessionPlan,
    route: Route
};

export const SessionPlanScreen = (props: SessionPlanProps) => {
    const plan: SessionPlan = props.route.params.plan;

    return (
        <ScreenWrapper>
            <View style={{
                ...AppPaddingStyle
            }}>
                <StartButton/>
                <Text style={{
                    color: 'grey',
                    fontSize: 16,
                }}>
                    Total duration: {totalDurationInMinutes(plan)} minutes
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

const ActivityView = (props: { activity: PlanActivity }) => {
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
        </View>
    );
};

const getActivityColor = (activity: ActivityType): string => {
    switch (activity) {
        case ActivityType.Break:
            return 'transparent';
        case ActivityType.Piece:
            return '#d0dbff';
        case ActivityType.Technique:
            return '#b3d4d6';
        case ActivityType.SightReading:
            return 'brown';
    }
};
