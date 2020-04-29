import React from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { ActivityTimingStyle, PlanItemStyle as getStyle } from "../../AppStyle";
import { useTheme } from "../../theme";
import { ActivitiesReport, getActivitiesReport } from "../../types/ActivitiesReport";
import { ActivityType } from "../../types/Activity";
import { SessionPlan } from "../../types/SessionPlan";
import { formatMinutesShort } from "../../utils/time";
import { getActivityIcon } from "../basic/Inputs/ActivityTypeSelect";

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
    <View style={ActivityTimingStyle.timingWrap}>
        <ActivityTiming activity={ActivityType.Technique} duration={65}/>
        <ActivityTiming activity={ActivityType.Piece} duration={props.report.pieces}/>
        <ActivityTiming activity={ActivityType.SightReading} duration={props.report.sightReading}/>
        <ActivityTiming activity={ActivityType.Break} duration={props.report.break}/>
    </View>
);

const ActivityTiming = (props: { activity: ActivityType, duration: number }) => (
    <View style={ActivityTimingStyle.timing}>
        <Text style={{ color: useTheme().colors.colorFaded }}>
            <Text style={{ fontSize: 16, }}>{formatMinutesShort(props.duration)}</Text></Text>
        {getActivityIcon(props.activity)({ size: 18 })}
    </View>
);
