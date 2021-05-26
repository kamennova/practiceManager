import React from "react";
import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { ActivityTimingStyle, PlanItemStyle as getStyle } from "../../AppStyle";
import { useTheme } from "../../theme";
import { ActivitiesReport, ActivityType, getActivitiesReport } from "../../types/activity";
import { SessionPlan } from "../../types/plan";
import { formatMinutesShort } from "common/utils/time";

export const SessionPlanItem = (props: { plan: SessionPlan, onPress: () => void }) => {
    const style = getStyle(useTheme().colors);
    const report = getActivitiesReport(props.plan.schedule);

    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={style.item}>
                <Text style={style.title}>
                    {props.plan.name}
                </Text>

                <PlanTiming report={report}/>
            </View>
        </TouchableWithoutFeedback>
    );
};

const PlanTiming = (props: { report: ActivitiesReport }) => (
    <View style={timingWrapStyle}>
        <ActivityTiming activity={ActivityType.Technique} duration={props.report.technique}/>
        <ActivityTiming activity={ActivityType.Piece} duration={props.report.pieces}/>
        <ActivityTiming activity={ActivityType.SightReading} duration={props.report.sightReading}/>
        <ActivityTiming activity={ActivityType.Break} duration={props.report.break}/>
    </View>
);

const ActivityTiming = (props: { activity: ActivityType, duration: number }) => {
    const style = ActivityTimingStyle(useTheme().colors);

    return (
        <View style={style.timing}>
            <Text style={style.duration}>
                {formatMinutesShort(props.duration/60)}</Text>
            <Text style={style.activity}>{props.activity}</Text>
        </View>
    );
};

const timingWrapStyle: ViewStyle = {
    width: '100%',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
};
