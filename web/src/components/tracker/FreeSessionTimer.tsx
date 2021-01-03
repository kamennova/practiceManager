import { Activity, ActivityType } from 'common/types/activity';
import { getSeconds } from 'common/utils/time';
import * as React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { SessionTimer } from "./SessionTimer";
import { TimeTracker } from "./TimeTracker";
import {pushActivity} from 'common/store/actions';

type TimerProps = {
    activity: Activity,
    pushActivity: (_: Activity) => void,
    onNext: () => void,
};

const FreeSession = (props: TimerProps) => {
    const [seconds, setSeconds] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [start, setStart] = useState(getSeconds());

    useEffect(() => {
        let timeout: number | null = null;

        if (!isPaused) {
            // @ts-ignore
            timeout = setInterval(() => {
                setSeconds(getSeconds() - start);
            }, 100);
        } else if (isPaused && timeout !== null) {
            clearInterval(timeout);
        }

        return () => {
            if (timeout !== null) clearInterval(timeout)
        };
    }, [isPaused, seconds]);

    useEffect(() => {
        props.pushActivity(props.activity);
        setStart(getSeconds());
    }, [props.activity]);

    const resumeTimer = () => {
        setStart(getSeconds() - seconds);
        setIsPaused(false);
    };

    const onBreak = () => {
        setIsPaused(true);
        props.pushActivity({ type: ActivityType.Break });
    };

    return (
        <SessionTimer isFree={true}
                      onNextActivity={props.onNext}
                      activity={props.activity}
                      onBreak={onBreak}>
            <TimeTracker seconds={seconds} activityType={props.activity.type}/>
        </SessionTimer>
    );
};

const mapDispatchToProps = (dispatch: any) => ({
    pushActivity: (act: Activity) => dispatch(pushActivity(act))
});

export const FreeSessionTimer = connect(undefined, mapDispatchToProps)(FreeSession);
