import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { BackHandler, Route, View } from "react-native";
import { SessionScreenStyle } from "../../AppStyle";
import { ActivityType, ComplexActivity, SimpleActivity } from "../../types/Activity";
import {
    TimerBreakButton,
    TimerButtonsWrapper,
    TimerFinishButton,
    TimerNextButton,
    TimerResumeButton
} from "../basic/Buttons/TimerButton";
import { TimeTracker } from "../basic/TimeTrackers";
import { getActivityColor, getScreenBgByActivity } from "./Colors";
import { getPlannedSessionActivityTitle, SessionActivityTitle } from "./SessionScreenElements";

type SessionScreenProps = {
    route: Route,
};

export const PlannedSessionTimer = (props: SessionScreenProps) => {
    const [activityIndex, updateActivityIndex] = useState(0),
        [isUnplannedBreak, updateIsUnplannedBreak] = useState(false),
        plan = props.route.params.plan;
    const currentActivity: SimpleActivity | ComplexActivity = plan.schedule[activityIndex];
    const [seconds, updateSeconds] = useState(currentActivity.duration * 60);
    const timer = createTimer(seconds, updateSeconds),
        color = getActivityColor(currentActivity.type),
        nav = useNavigation(),
        isBreak = currentActivity.type === ActivityType.Break || isUnplannedBreak;

    const changeScreen = () => {
        if (activityIndex === plan.schedule.length - 1) { // this activity was the last one
            nav.navigate('SessionEndScreen');
        } else {
            updateActivityIndex(activityIndex + 1);
        }
    };

    if (seconds <= 0) {
        changeScreen();
    }

    const endSession = () => {
        clearTimeout(timer);
        nav.navigate('EndSessionScreen', { history: history });
    };

    const skip = () => {

    };

    const takeABreak = () => {

    };

    const resume = () => {
        if (isUnplannedBreak) {
            updateIsUnplannedBreak(false);
        }
    };

    return (
        <View style={{
            ...SessionScreenStyle,
            backgroundColor: getScreenBgByActivity(currentActivity.type)
        }}>
            <SessionActivityTitle title={getPlannedSessionActivityTitle(currentActivity.type)} color={color}/>
            <TimeTracker seconds={seconds} textStyle={{ color: color }}/>

            <TimerButtonsWrapper>
                <TimerFinishButton onPress={endSession}>End session</TimerFinishButton>

                {!isBreak ?
                    [
                        <TimerBreakButton style={{}} onPress={takeABreak}>Take a break</TimerBreakButton>,
                        <TimerNextButton style={{}} onPress={skip}>Skip this :(</TimerNextButton>] :
                    <TimerResumeButton onPress={resume}>Resume</TimerResumeButton>
                }

            </TimerButtonsWrapper>
        </View>
    );
};

const createTimer = (seconds: any, updateSeconds: (seconds: number) => void) => {
    const timer = setTimeout(() => updateSeconds(seconds - 1), 1000);

    BackHandler.addEventListener('hardwareBackPress', () => {
        clearTimeout(timer);
        return true;
    });

    return timer;
};
