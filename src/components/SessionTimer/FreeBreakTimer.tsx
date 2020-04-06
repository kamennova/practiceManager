import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from "react-native";
import { SessionScreenStyle } from "../../AppStyle";
import { FREE_SESSION_TIMER, SESSION_END } from "../../NavigationPath";
import { ActivityType } from "../../types/Activity";
import { ResumeButton, TimerButtonsWrapper } from "../basic/Buttons/TimerButton";
import { TimeTracker } from "../basic/TimeTrackers";
import { getActivityColor, getScreenBgByActivity } from "./Colors";
import { getFreeSessionActivityTitle, SessionActivityTitle } from "./SessionScreenElements";
import { startTimer } from "./timer";

export const FreeBreakTimer = () => {
    const [seconds, updateSeconds] = useState(0);
    const nav = useNavigation(),
        color = getActivityColor(ActivityType.Break),
        timer = startTimer(seconds, updateSeconds);

    const resumeActivity = () => {
        nav.navigate(FREE_SESSION_TIMER);
    };

    const endSession = (isTimeout: boolean = false) => {
        clearTimeout(timer);
        nav.navigate(SESSION_END, { timeout: isTimeout });
    };

    if (seconds > 60 * 60) { // todo settings
        endSession(true);
    }

    return (
        <View style={{
            ...SessionScreenStyle,
            backgroundColor: getScreenBgByActivity(ActivityType.Break)
        }}>
            <SessionActivityTitle color={color} title={getFreeSessionActivityTitle(ActivityType.Break)}/>
            <TimeTracker seconds={seconds} style={{ marginTop: 50 }}
                         textStyle={{ color: getActivityColor(ActivityType.Break) }}/>

            <TimerButtonsWrapper>
                <ResumeButton textStyle={{ color: color, fontWeight: 'bold' }}
                              style={{ borderColor: color, }}
                              onPress={resumeActivity}>Resume</ResumeButton>
            </TimerButtonsWrapper>
        </View>
    );
};
