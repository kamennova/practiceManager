import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Route, View } from "react-native";
import { Activity, ActivityType } from "../../types/Activity";
import { TimerButton } from "../basic/Buttons/TimerButton";
import { Stopwatch } from "../basic/Stopwatch";
import { SessionTimerTitle } from "./SessionScreenElements";

type FreeSessionTimerProps = {
    route: Route,
};

export const FreeSessionTimer = (props: FreeSessionTimerProps) => {
    const [history, updateHistory] = useState<Activity[]>(props.route.params.history);
    const [seconds, updateSeconds] = useState(0);
    const currentActivity: Activity = history[history.length - 1];

    setTimeout(() => updateSeconds(seconds + 1), 1000);

    const takeABreak = () => updateHistory([...history, { type: ActivityType.Break, duration: 0 }]);

    const resumeActivity = () => {
        const preBreakActivity = history[history.length - 2];
        updateHistory([...history, { ...preBreakActivity, duration: 0 }]);
    };

    return (
        <View style={{
            marginTop: 'auto',
            marginBottom: 'auto'
        }}>
            <SessionTimerTitle activity={currentActivity.type}/>
            <Stopwatch seconds={currentActivity.duration * 60}/>
            <View>
                {currentActivity.type !== ActivityType.Break ?
                    [
                        <TimerButton onPress={() => useNavigation().navigate('FreeSessionActivityChoice')}>
                            Change activity
                        </TimerButton>,
                        <TimerButton onPress={takeABreak}>Take a break</TimerButton>
                    ] :
                    <TimerButton onPress={resumeActivity}>Resume</TimerButton>}
            </View>
        </View>
    );
};
