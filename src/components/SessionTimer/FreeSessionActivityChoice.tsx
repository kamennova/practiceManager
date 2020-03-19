import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Route, View } from "react-native";
import { FullScreenModalStyle } from "../../AppStyle";
import { pieces } from "../../exampleData";
import { FREE_SESSION_TIMER } from "../../NavigationPath";
import { Activity, ActivityType, ComplexActivityType } from "../../types/Activity";
import { Button } from "../basic/Buttons/Button";
import { MyPicker } from "../basic/Inputs/Picker";
import { ModalSmallTitle, ModalTitle } from "../basic/Titles/ModalTitle";

export const FreeSessionActivityChoice = (props: { route: Route }) => {
    const history: Activity[] = props.route.params.history;
    const startActivity = history.length > 0 ? history[history.length - 1].type : ActivityType.WarmUp;

    const [activity, updateActivity] = useState<ActivityType>(startActivity);
    const [subActivity, updateSubActivity] = useState('none');

    const nav = useNavigation();

    const goToTimer = () => {
        const subActivities = (activity === ActivityType.Technique || activity === ActivityType.Pieces ? {
            schedule: [{
                type: subActivity,
                duration: 0
            }],
        } : {});

        const newActivity: Activity = { type: activity, duration: 0, ...subActivities };
        const newHistory = [...history];
        newHistory.push(newActivity);

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
            <ModalTitle> What are you on? </ModalTitle>

            <MyPicker items={activityItems} onValueChange={(val) => updateActivity(val)} selected={activity}/>

            {
                (activity === ActivityType.Technique || activity === ActivityType.Pieces) ?
                    <MyPicker items={SubActivities(activity).map(sub => ({ label: sub, val: sub }))}
                              onValueChange={(val) => updateSubActivity(val)} selected={subActivity}/>
                    : undefined
            }

            <Button textStyle={{ color: 'blue' }}
                    style={{ marginBottom: 15, marginTop: 'auto', borderColor: 'blue' }}
                    onPress={goToTimer}>Start</Button>
            <Button style={{}} onPress={() => nav.goBack()}>Cancel</Button>
        </View>
    );
};

const activityItems = [ActivityType.WarmUp, ActivityType.Pieces, ActivityType.Technique, ActivityType.SightReading].map(
    (activity) => ({ val: activity, label: activity })
);

const SubActivities = (activity: ComplexActivityType): string[] => {
    if (activity === ActivityType.Pieces) {
        return pieces.map(piece => piece.name);
    } else {
        return ['arpeggio', 'scales', 'other'];
    }
};
