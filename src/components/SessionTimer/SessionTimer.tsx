import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SESSION_END } from "../../NavigationPath";
import { Activity } from "../../types/Activity";
import { BreakButton, FinishButton, NextButton, TimerButtonsWrapper } from "../basic/Buttons/TimerButton";
import { TimerNotes } from "./Notes";
import { SessionTimerWrap } from "./SessionTimerWrap";
import { TimerWidgets } from "./TimerWidgets";

type SessionTimerProps = {
    isFree: boolean,
    onNextActivity: () => void,
    activity: Activity,
    children?:  JSX.Element,
    onBreak: () => void,
};

export const SessionTimer = (props: SessionTimerProps) => {
    const [showWidgets, setShowWidgets] = useState(false);
    const nav = useNavigation();

    const toggleShowWidgets = () => setShowWidgets(!showWidgets);

    const endSession = () => {
        nav.dispatch(StackActions.replace(SESSION_END));
    };

    return (
        <SessionTimerWrap activity={props.activity}>

            {props.children}

            <TimerNotes notes={[]} onAdd={() => {
            }}/>

            <TimerWidgets isVisible={showWidgets} toggleIsVisible={toggleShowWidgets}/>

            <TimerButtonsWrapper>
                <FinishButton onPress={endSession}/>
                <BreakButton onPress={props.onBreak}/>
                <NextButton onPress={props.onNextActivity} label={props.isFree ? 'Next' : 'Skip'}/>
            </TimerButtonsWrapper>
        </SessionTimerWrap>
    );
};
