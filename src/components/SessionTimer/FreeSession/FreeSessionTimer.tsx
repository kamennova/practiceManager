import { StackActions } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Route } from "react-native";
import { connect } from "react-redux";
import { FREE_BREAK_TIMER, FREE_SESSION_ACTIVITY_CHOICE } from "../../../NavigationPath";
import { pushActivity } from "../../../store/actions";
import { Activity, ActivityType } from "../../../types/Activity";
import { ActivityRecord } from "../../../types/ActivityRecord";
import { getSeconds } from "../../../utils/time";
import { TimeTracker } from "../../basic/TimeTrackers";
import { SessionTimer } from "../SessionTimer";

type FreeSessionTimerProps = {
    route: Route & { params: { activity: Activity } },
    navigation: any,
    pushActivity: (_: ActivityRecord) => void,
};

const FreeSession = (props: FreeSessionTimerProps) => {
    const [seconds, setSeconds] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [start, setStart] = useState(getSeconds());

    const activity = props.route.params.activity;

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
        props.pushActivity({ startedOn: Date.now(), ...props.route.params.activity });
        setStart(getSeconds());
    }, [props.route.params.activity]);

    const changeActivity = () => {
        props.navigation.dispatch(StackActions.push(FREE_SESSION_ACTIVITY_CHOICE));
    };

    const resumeTimer = () => {
        setStart(getSeconds() - seconds);
        setIsPaused(false);
    };

    const onBreak = () => {
        setIsPaused(true);

        props.pushActivity({ startedOn: Date.now(), type: ActivityType.Break });
        props.navigation.navigate(FREE_BREAK_TIMER, {
            onGoBack: resumeTimer,
        });
    };

    return (
        <SessionTimer isFree={true}
                      onNextActivity={changeActivity}
                      activity={activity}
                      onBreak={onBreak}>
            <TimeTracker seconds={seconds} activityType={activity.type}/>
        </SessionTimer>
    );
};

const mapDispatchToProps = (dispatch: any) => ({
    pushActivity: (act: ActivityRecord) => dispatch(pushActivity(act))
});

export const FreeSessionTimer = connect(undefined, mapDispatchToProps)(FreeSession);
