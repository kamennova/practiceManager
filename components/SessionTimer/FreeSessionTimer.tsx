import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { BackHandler, Route, View } from "react-native";
import { SessionScreenStyle } from "../../AppStyle";
import { Activity, ActivityType } from "../../types/Activity";
import {
    TimerBreakButton,
    TimerButtonsWrapper,
    TimerFinishButton,
    TimerNextButton,
    TimerResumeButton
} from "../basic/Buttons/TimerButton";
import { TimeTracker } from "../basic/TimeTrackers";

import { getActivityColor, getScreenBgByActivity } from "./Colors";
import { getFreeSessionActivityTitle, SessionActivityTitle } from "./SessionScreenElements";


type FreeSessionTimerProps = {
    route: Route,
};

export const FreeSessionTimer = (props: FreeSessionTimerProps) => {
    const history: Activity[] = props.route.params.history;
    const currentActivity: Activity = history[history.length - 1];
    const [seconds, updateSeconds] = useState(currentActivity.duration);
    const nav = useNavigation(),
        color = getActivityColor(currentActivity.type),
        timer = startTimer(seconds, updateSeconds),
        isBreak = currentActivity.type === ActivityType.Break;

    const takeABreak = () => {
        clearTimeout(timer);

        let newHistory = history;
        newHistory[newHistory.length - 1].duration = Math.floor(seconds / 60);

        nav.navigate('FreeSessionTimer', {
            history: [...history, {
                type: ActivityType.Break,
                duration: 0,
            }]
        })
    };

    const changeActivity = () => {
        clearTimeout(timer);
        nav.navigate('FreeSessionActivityChoice');
    };

    const resumeActivity = () => {
        const preBreakActivity = history[history.length - 2];
        nav.navigate('FreeSessionTimer', { history: [...history, { ...preBreakActivity, duration: 0 }] });
    };

    const endSession = () => {
        clearTimeout(timer);
        nav.navigate('SessionEndScreen', { history: history });
    };

    return (
        <View style={{
            ...SessionScreenStyle,
            backgroundColor: getScreenBgByActivity(currentActivity.type)
        }}>
            <SessionActivityTitle color={color} title={getFreeSessionActivityTitle(currentActivity.type)}/>
            <TimeTracker seconds={seconds} style={{ marginTop: 50 }}
                         textStyle={{ color: getActivityColor(currentActivity.type) }}/>
            <TimerButtonsWrapper>

                <TimerFinishButton onPress={endSession}> End session </TimerFinishButton>

                {!isBreak ?
                    [
                        <TimerBreakButton textStyle={{ color: '#963107' }}
                                          style={{ borderColor: 'transparent', backgroundColor: '#bf623c' }}
                                          onPress={takeABreak}>Take a break</TimerBreakButton>,
                        <TimerNextButton style={{ borderColor: color, }}
                                         textStyle={{ color: color, fontWeight: 'bold' }}
                                         onPress={changeActivity}>
                            Change activity
                        </TimerNextButton>,
                    ] :
                    <TimerResumeButton textStyle={{ color: color, fontWeight: 'bold' }}
                                       style={{ borderColor: color, }}
                                       onPress={resumeActivity}>Resume</TimerResumeButton>}

            </TimerButtonsWrapper>
        </View>
    );
};

const startTimer = (seconds: number, updateSeconds: (seconds: number) => void): any => {
    const timer = setTimeout(() => updateSeconds(seconds + 1), 1000);

    BackHandler.addEventListener('hardwareBackPress', () => {
        clearTimeout(timer);
        return true;
    });

    return timer;
};
