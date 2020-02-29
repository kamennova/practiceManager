import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Route, View } from "react-native";
import { ComplexActivity, SimpleActivity } from "../../types/Activity";
import { Timer } from "../basic/Timer";
import { SessionTimerTitle } from "./SessionScreenElements";

type SessionScreenProps = {
    route: Route
}

export const PlannedSessionScreen = (props: SessionScreenProps) => {
    const plan = props.route.params.plan;

    const [activityIndex, updateActivityIndex] = useState(0);
    const current: SimpleActivity | ComplexActivity = plan.schedule[activityIndex];

    const changeScreen = () => {
        if (activityIndex === plan.schedule.length - 1) {
            useNavigation().navigate('SessionEndScreen');
        } else {
            updateActivityIndex(activityIndex + 1);
        }
    };

    return (
        <View style={{
            marginTop: 'auto',
            marginBottom: 'auto'
        }}>
            <SessionTimerTitle activity={current.type}/>
            <Timer seconds={current.duration * 60}
                   onFinish={changeScreen}/>
        </View>
    );
};
