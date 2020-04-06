import { StackActions } from '@react-navigation/native';
import React, { useState } from 'react';
import { Route, View } from "react-native";
import { connect } from "react-redux";
import { SessionScreenStyle } from "../../AppStyle";
import { FREE_BREAK_TIMER, FREE_SESSION_ACTIVITY_CHOICE, SESSION_END } from "../../NavigationPath";
import { pushActivity } from "../../store/actions";
import { Activity, ActivityType } from "../../types/Activity";
import { ActivityRecord } from "../../types/ActivityRecord";
import { BreakButton, FinishButton, NextButton, TimerButtonsWrapper } from "../basic/Buttons/TimerButton";
import { TimeTracker } from "../basic/TimeTrackers";
import { getActivityColor, getScreenBgByActivity } from "./Colors";
import { getFreeSessionActivityTitle, SessionActivityTitle } from "./SessionScreenElements";
import { startTimer } from "./timer";

type FreeSessionTimerProps = {
    route: Route & { params: { activity: Activity, isResumed?: boolean } },
    navigation: any,
    pushActivity: (_: ActivityRecord) => void,
};

const FreeSession = (props: FreeSessionTimerProps) => {
    const activity: Activity = props.route.params.activity;
    const [seconds, updateSeconds] = useState(0);
    const color = getActivityColor(activity.type),
        timer = startTimer(seconds, updateSeconds);

    const takeABreak = () => {
        clearTimeout(timer);
        props.pushActivity({ startedOn: Date.now(), type: ActivityType.Break });
        props.navigation.dispatch(StackActions.push(FREE_BREAK_TIMER));
    };

    const changeActivity = () => {
        clearTimeout(timer);
        props.navigation.dispatch(StackActions.push(FREE_SESSION_ACTIVITY_CHOICE));
    };

    const endSession = (isTimeout: boolean = false) => {
        clearTimeout(timer);
        props.navigation.navigate(SESSION_END, { timeout: isTimeout });
    };

    return (
        <View style={{
            ...SessionScreenStyle,
            backgroundColor: getScreenBgByActivity(activity.type)
        }}>
            <SessionActivityTitle color={color} title={getFreeSessionActivityTitle(activity.type)}/>
            <TimeTracker seconds={seconds} style={{ marginTop: 50 }}
                         textStyle={{ color: getActivityColor(activity.type) }}/>

            <TimerButtonsWrapper>
                <FinishButton onPress={endSession}>Finish</FinishButton>
                <BreakButton onPress={takeABreak}>Break</BreakButton>
                <NextButton textStyle={{ color: color, fontWeight: 'bold' }} onPress={changeActivity}>Next</NextButton>
            </TimerButtonsWrapper>
        </View>
    );
};

const mapDispatchToProps = (dispatch: any) => ({
    pushActivity: (act: ActivityRecord) => dispatch(pushActivity(act))
});

export const FreeSessionTimer = connect(undefined, mapDispatchToProps)(FreeSession);
