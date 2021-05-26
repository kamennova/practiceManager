import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { SESSION_END } from "../../../NavigationPath";
import { thunkEndSession } from "../../../store/thunks/session";
import { ActivityType } from "../../../types/activity";
import { getSeconds } from "common/utils/time";
import { ResumeButton, TimerButtonsWrapper } from "../../basic/buttons/TimerButton";
import { TimeTracker } from "../../basic/timeTrackers";
import { SessionTimerWrap } from "../SessionTimerWrap";

type TimerProps = {
    navigation: any,
    route: {
        params: {
            onGoBack: () => void,
        }
    },
    onTimeoutEndSession: () => void,
};

const FreeBreakTimerComponent = (props: TimerProps) => {
    const [seconds, setSeconds] = useState(0);
    const [start] = useState(getSeconds()); // todo

    useEffect(() => {
        let timeout = setInterval(() => {
            setSeconds(getSeconds() - start);
        }, 100);

        return () => {
            if (timeout !== null) clearInterval(timeout)
        };
    }, [seconds]);

    const resumeActivity = () => {
        props.route.params.onGoBack();
        props.navigation.goBack();
    };

    if (seconds > 60 * 60) { // todo settings
        props.onTimeoutEndSession();
        props.navigation.navigate(SESSION_END);
    }

    return (
        <SessionTimerWrap activity={{ type: ActivityType.Break }}>
            <TimeTracker seconds={seconds} activityType={ActivityType.Break}/>

            <TimerButtonsWrapper style={{ marginTop: 'auto' }}>
                <ResumeButton onPress={resumeActivity}/>
            </TimerButtonsWrapper>
        </SessionTimerWrap>
    );
};

const mapDispatchToProps = (dispatch: any) => ({
    onTimeoutEndSession: () => dispatch(thunkEndSession(true))
});

export const FreeBreakTimer = connect(undefined, mapDispatchToProps)(FreeBreakTimerComponent);
