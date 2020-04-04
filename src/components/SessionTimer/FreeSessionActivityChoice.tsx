import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Route, View } from "react-native";
import { FullScreenModalStyle } from "../../AppStyle";
import { FREE_SESSION_TIMER } from "../../NavigationPath";
import { Activity, ActivityType } from "../../types/Activity";
import { Button } from "../basic/Buttons/Button";
import { ComplexActivityFields } from "../basic/ComplexActivityFields";
import { MyPicker } from "../basic/Inputs/Picker";
import { ModalSmallTitle, ModalTitle } from "../basic/Titles/ModalTitle";

const BaseActivity = { type: ActivityType.Break, duration: 3 };

export const FreeSessionActivityChoice = (props: { route: Route }) => {
    const history: Activity[] = props.route.params.history;
    const [activity, updateActivity] = useState<Activity>(BaseActivity);

    const nav = useNavigation();

    const goToTimer = () => {
        const newHistory = [...history, activity];

        nav.navigate(FREE_SESSION_TIMER, { history: newHistory });
    };

    return (
        <View style={{
            ...FullScreenModalStyle,
            paddingBottom: 100,
            paddingLeft: 50,
            paddingRight: 50,
        }}>
            <ModalSmallTitle>Free session</ModalSmallTitle>
            <ModalTitle> What are you up for? </ModalTitle>

            <MyPicker items={activityItems} onValueChange={(val) => updateActivity(val)} selected={activity}/>

            {activity !== ActivityType.Break ?
                <ComplexActivityFields type={activity.type}
                                       setExercise={() => {}} setPieceId={()=>{}} setTonality={()=>{}}/>
                : undefined
            }

            <Button textStyle={{ color: 'blue' }}
                    style={{ marginBottom: 15, marginTop: 'auto', borderColor: 'blue' }}
                    onPress={goToTimer}>Start</Button>
            <Button style={{}} onPress={() => nav.goBack()}>Cancel</Button>
        </View>
    );
};

const activityItems = [ActivityType.Piece, ActivityType.Technique, ActivityType.SightReading].map(
    (activity) => ({ val: activity, label: activity })
);
