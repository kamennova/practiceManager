import { StackActions } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Route } from "react-native";
import { connect } from "react-redux";
import { FREE_BREAK_TIMER, SESSION_END } from "../../../NavigationPath";
import { pushActivity } from "../../../store/actions";
import { thunkEndSession } from "../../../store/thunks/session";
import { Activity, ActivityType } from "../../../types/Activity";
import { SessionPlan } from "../../../types/plan";
import { getSeconds } from "../../../utils/time";
import { TimeTracker } from "../../basic/timeTrackers";
import { SessionTimer } from "../SessionTimer";

type SessionScreenProps = {
    route: Route & { params: { plan: SessionPlan } },
    navigation: any,
    pushActivity: (_: Activity) => void,
    onEndSession: () => void,
};

const TimerComponent = (props: SessionScreenProps) => {
    const [activityIndex, setActivityIndex] = useState(0);
    const plan = props.route.params.plan;
    const activity = () => plan.schedule[activityIndex];

    const [seconds, setSeconds] = useState(activity().duration);
    const [isPaused, setIsPaused] = useState(false);
    const [start, setStart] = useState(getSeconds());

    const nextActivity = () => {
        if (activityIndex === plan.schedule.length - 1) { // this activity was the last one
            props.onEndSession();
            props.navigation.dispatch(StackActions.replace(SESSION_END));
        } else {
            setActivityIndex(activityIndex + 1);
            setSeconds(activity().duration);
            setStart(getSeconds());
        }
    };

    const isOutOfActivities = () => activityIndex >= plan.schedule.length;

    useEffect(() => {
        let timeout: number | null = null;

        if (!isPaused && !isOutOfActivities()) {
            // @ts-ignore
            timeout = setInterval(() => {
                setSeconds(activity().duration - (getSeconds() - start));
            }, 100);

            if (seconds <= 0) {
                nextActivity(); // todo +second
            }
        } else if (timeout !== null) {
            clearInterval(timeout);
        }

        return () => {
            if (timeout !== null) clearInterval(timeout)
        };
    }, [isPaused, seconds, activityIndex, activity]);

    useEffect(() => {
        props.pushActivity(activity());
    }, [activityIndex]);

    const resumeTimer = () => {
        setStart(getSeconds() - seconds);
        setIsPaused(false);
    };

    const onBreak = () => {
        setIsPaused(true);
        props.pushActivity({ type: ActivityType.Break });
        props.navigation.navigate(FREE_BREAK_TIMER, { onGoBack: resumeTimer });
    };

    return (
        <SessionTimer isFree={false} onNextActivity={nextActivity} activity={activity()} onBreak={onBreak}>
            <TimeTracker seconds={seconds} activityType={activity().type}/>
        </SessionTimer>
    );
};

const mapDispatchToProps = (dispatch: any) => ({
    pushActivity: (act: Activity) => dispatch(pushActivity(act)),
    onEndSession: () => dispatch(thunkEndSession()),
});

export const PlannedSessionTimer = connect(undefined, mapDispatchToProps)(TimerComponent);
