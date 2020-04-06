import React, { useState } from 'react';
import { Route, View } from "react-native";
import { SessionScreenStyle } from "../../AppStyle";
import { PLANNED_SESSION_TIMER, SESSION_END } from "../../NavigationPath";
import { ActivityType } from "../../types/Activity";
import { PlanActivity } from "../../types/PlanActivity";
import { SessionPlan } from "../../types/SessionPlan";
import { BreakButton, FinishButton, NextButton, ResumeButton, TimerButtonsWrapper } from "../basic/Buttons/TimerButton";
import { TimeTracker } from "../basic/TimeTrackers";
import { getActivityColor, getScreenBgByActivity } from "./Colors";
import { getPlannedSessionActivityTitle, SessionActivityTitle } from "./SessionScreenElements";
import { startCountdown } from "./timer";

type SessionScreenProps = {
    route: Route & { params: { index: number } },
    plan: SessionPlan,
    navigation: any,
};

export const PlannedSessionTimer = (props: SessionScreenProps) => {
    const activity: PlanActivity = props.plan.schedule[props.route.params.index];
    const [seconds, updateSeconds] = useState(activity.duration * 60);
    const timer = startCountdown(seconds, updateSeconds),
        color = getActivityColor(activity.type),
        isBreak = activity.type === ActivityType.Break;

    const changeScreen = () => {
        if (props.route.params.index === props.plan.schedule.length - 1) { // this activity was the last one
            props.navigation.replace(SESSION_END);
        } else {
            props.navigation.replace(PLANNED_SESSION_TIMER, { index: props.route.params.index + 1 });
        }
    };

    if (seconds <= 0) {
        changeScreen();
    }

    const endSession = () => {
        clearTimeout(timer);
        props.navigation.replace(SESSION_END);
    };

    const skip = () => {

    };

    const takeABreak = () => {

    };

    const resume = () => {

    };

    return (
        <View style={{
            ...SessionScreenStyle,
            backgroundColor: getScreenBgByActivity(activity.type)
        }}>
            <SessionActivityTitle title={getPlannedSessionActivityTitle(activity.type)} color={color}/>
            <TimeTracker seconds={seconds} textStyle={{ color: color }}/>

            <TimerButtonsWrapper>
                <FinishButton onPress={endSession}>Finish</FinishButton>

                {!isBreak ? [
                    <BreakButton style={{}} onPress={takeABreak}>Break</BreakButton>,
                    <NextButton style={{}} onPress={skip}>Skip(</NextButton>
                ] : <ResumeButton onPress={resume}>Resume</ResumeButton>}

            </TimerButtonsWrapper>
        </View>
    );
};
