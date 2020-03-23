import React, { useState } from 'react';
import { BackHandler, TextStyle, ViewStyle } from "react-native";
import { TimeTracker } from "./TimeTracker";

type TimerProps = {
    seconds: number,
    onFinish: () => void,
    style?: ViewStyle,
    textStyle?: TextStyle,
};

export const Timer = (props: TimerProps) => {
    const [seconds, updateSeconds] = useState(props.seconds);

    const timer = setTimeout(() => updateSeconds(seconds - 1), 1000);

    BackHandler.addEventListener('hardwareBackPress', function() {
        clearTimeout(timer);

        return true;
    });

    if (seconds <= 0) {
        clearTimeout(timer);
        props.onFinish();
    }

    return (<TimeTracker style={props.style} textStyle={props.textStyle} seconds={seconds}/>);
};
