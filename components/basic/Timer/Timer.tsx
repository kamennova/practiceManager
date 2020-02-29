import React, { useState } from 'react';
import { Text, View } from "react-native";
import { formatSeconds } from "../../../types/Time";

type TimerProps = {
    seconds: number,
    onFinish: () => void,
};

export const Timer = (props: TimerProps) => {
    const [seconds, updateSeconds] = useState(props.seconds);

    setTimeout(() => updateSeconds(seconds - 1), 1000);

    if (seconds <= 0) {
        props.onFinish();
    }

    const showHours = props.seconds / 3600 >= 1;

    return (
        <View>
            <Text style={{
                fontSize: 50,
                color: 'black',
                textAlign: 'center',
            }}>
                {showHours ? formatSeconds(Math.floor(seconds / 3600)) + ': ' : undefined}
                {formatSeconds(Math.floor((seconds / 60) % 60))}:{formatSeconds(seconds % 60)}
            </Text>
        </View>
    );
};
