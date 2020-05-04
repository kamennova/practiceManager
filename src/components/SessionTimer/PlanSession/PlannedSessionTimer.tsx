import React, { useEffect, useState } from 'react';
import { Route } from "react-native";
import { connect } from "react-redux";
import { FREE_BREAK_TIMER, SESSION_END } from "../../../NavigationPath";
import { StateShape } from "../../../store/StoreState";
import { SessionPlan } from "../../../types/SessionPlan";
import { getSeconds } from "../../../utils/time";
import { TimeTracker } from "../../basic/TimeTrackers";
import { SessionTimer } from "./../SessionTimer";

type SessionScreenProps = {
    route: Route & { params: { planId: number } },
    plan: SessionPlan,
    navigation: any,
};

const SessionComponent = (props: SessionScreenProps) => {
    const [activityIndex, setActivityIndex] = useState(0);
    const activity = props.plan.schedule[activityIndex];

    const [seconds, setSeconds] = useState(activity.duration);
    const [isPaused, setIsPaused] = useState(false);
    const [start, setStart] = useState(getSeconds());

    const nextActivity = () => {
        console.log('index', activityIndex);

        if (activityIndex === props.plan.schedule.length - 1) { // this activity was the last one
            console.log(props.plan);
            props.navigation.navigate('Root', {screen: SESSION_END});
        } else {
            setActivityIndex(activityIndex + 1);
        }
    };

    if (seconds <= 0) {
        nextActivity();
    }

    useEffect(() => {
        let timeout: number | null = null;

        if (!isPaused) {
            // @ts-ignore
            timeout = setInterval(() => {
                setSeconds(activity.duration - (getSeconds() - start));
            }, 100);
        } else if (isPaused && timeout !== null) {
            clearInterval(timeout);
        }

        return () => {
            if (timeout !== null) clearInterval(timeout)
        };
    }, [isPaused, seconds]);

    useEffect(() => {
        console.log('index update');
        setStart(getSeconds());
    }, [activityIndex]);

    const resumeTimer = () => {
        setStart(getSeconds() - seconds);
        setIsPaused(false);
    };

    const onBreak = () => {
        setIsPaused(true);

        // props.pushActivity({ startedOn: Date.now(), type: ActivityType.Break }); //todo
        props.navigation.navigate(FREE_BREAK_TIMER, {
            onGoBack: resumeTimer
        });
    };

    return (
        <SessionTimer isFree={false} onNextActivity={nextActivity} activity={activity} onBreak={onBreak}>
            <TimeTracker seconds={seconds} activityType={activity.type}/>
        </SessionTimer>
    );
};

const mapStateToProps = (state: StateShape, ownProps: SessionScreenProps) => ({
    plan: findPlanOrThrowError(state.plans.items, ownProps.route.params.planId),
});

const findPlanOrThrowError = (plans: SessionPlan[], planId: number) => {
    const plan = plans.find(item => item.id === planId);

    if (plan === undefined) {
        throw new Error('Plan not found');
    }

    return plan;
};

export const PlannedSessionTimer = connect(mapStateToProps)(SessionComponent);
