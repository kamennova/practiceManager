import React, { useEffect, useState } from 'react';
import { SESSION_END } from "../../../NavigationPath";
import { ActivityType } from "../../../types/Activity";
import { ResumeButton, TimerButtonsWrapper } from "../../basic/Buttons/TimerButton";
import { TimeTracker } from "../../basic/TimeTrackers";
import { startTimer } from "../timer";
import { getActivityColor } from "./../Colors";
import { SessionTimerWrap } from "./../SessionTimerWrap";

export const FreeBreakTimer = (props: { navigation: any, route: { params: { onGoBack: () => void } } }) => {
    const [seconds, setSeconds] = useState(0);
    const color = getActivityColor(ActivityType.Break);
    // const timer = startTimer(seconds, setSeconds);


    const resumeActivity = () => {
        // clearTimeout(timer);
        // updateSeconds(0);
        props.route.params.onGoBack();
        props.navigation.goBack();
    };

    const endSession = (isTimeout: boolean = false) => {
        // clearTimeout(timer);
        props.navigation.navigate(SESSION_END, { timeout: isTimeout });
    };

    if (seconds > 60 * 60) { // todo settings
        endSession(true);
    }

    return (
        <SessionTimerWrap activity={{ type: ActivityType.Break }}>
            <TimeTracker seconds={seconds} style={{ marginTop: 50 }} textStyle={{ color: color }}/>

            <TimerButtonsWrapper>
                <ResumeButton onPress={resumeActivity}/>
            </TimerButtonsWrapper>
        </SessionTimerWrap>
    );
};
