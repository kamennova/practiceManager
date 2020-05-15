import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from "react-native";
import { connect } from "react-redux";
import { SESSION_END } from "../../NavigationPath";
import { thunkEndSession } from "../../store/thunks/session";
import { Activity } from "../../types/Activity";
import { BreakButton, FinishButton, NextButton, TimerButtonsWrapper } from "../basic/buttons/TimerButton";
import { TimerNotes } from "./Notes";
import { SessionTimerWrap } from "./SessionTimerWrap";
import { TimerWidgets } from "./TimerWidgets";

type SessionTimerProps = {
    isFree: boolean,
    activity: Activity,
    onNextActivity: () => void,
    onBreak: () => void,
    onEndSession: () => void,
    children?: JSX.Element,
};

const SessionTimerComponent = (props: SessionTimerProps) => {
    const [showWidgets, setShowWidgets] = useState(false);
    const nav = useNavigation();

    const toggleShowWidgets = () => setShowWidgets(!showWidgets);

    const endSession = () => {
        props.onEndSession();
        nav.dispatch(StackActions.replace(SESSION_END));
    };

    return (
        <SessionTimerWrap activity={props.activity}>
            {props.children}

            <TimerNotes notes={[]} onAdd={() => {
            }}/>

            <View style={{ width :'100%', marginTop: 'auto', alignItems: 'center'}}>
                <TimerWidgets isVisible={showWidgets} toggleIsVisible={toggleShowWidgets}/>

                <TimerButtonsWrapper>
                    <FinishButton onPress={endSession}/>
                    <BreakButton onPress={props.onBreak}/>
                    <NextButton onPress={props.onNextActivity} label={props.isFree ? 'Next' : 'Skip'}/>
                </TimerButtonsWrapper>
            </View>
        </SessionTimerWrap>
    );
};

const mapDispatchToProps = (dispatch: any) => ({
    onEndSession: () => dispatch(thunkEndSession()),
});

export const SessionTimer = connect(undefined, mapDispatchToProps)(SessionTimerComponent);
