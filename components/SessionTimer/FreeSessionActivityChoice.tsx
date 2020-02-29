import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Picker, PickerItem, Route, View } from "react-native";
import { PickerStyle } from "../../AppStyle";
import { pieces } from "../../exampleData";
import { Activity, ActivityType, ComplexActivityType } from "../../types/Activity";
import { TimerButton } from "../basic/Buttons/TimerButton";
import { ScreenTitle } from "../basic/Titles/Titles";

export const FreeSessionActivityChoice = (props: { route: Route }) => {
    const history: Activity[] = props.route.params.history;
    const startActivity = history.length > 0 ? history[history.length - 1].type : ActivityType.WarmUp;

    const [activity, updateActivity] = useState<ActivityType>(startActivity);
    const [subActivity, updateSubActivity] = useState('none');

    const goToTimer = () => {
        const subActivities = activity === ActivityType.Technique || activity === ActivityType.Pieces ? {
            schedule: [{
                type: subActivity,
                duration: 0
            }],
        } : {};

        const newActivity: Activity = { type: activity, duration: 0, ...subActivities };
        useNavigation().navigate('FreeSessionTimer', { history: [...history, newActivity] });
    };

    return (
        <View>
            <ScreenTitle> What are you on? </ScreenTitle>

            <Picker style={PickerStyle} onValueChange={(val) => updateActivity(val)} selectedValue={activity}>
                <Picker.Item label={ActivityType.WarmUp} value={ActivityType.WarmUp}/>
                <Picker.Item label={ActivityType.Technique} value={ActivityType.Technique}/>
                <Picker.Item label={ActivityType.Pieces} value={ActivityType.Pieces}/>
                <Picker.Item label={ActivityType.SightReading} value={ActivityType.SightReading}/>
            </Picker>

            {
                (activity === ActivityType.Technique || activity === ActivityType.Pieces) ?
                    <Picker onValueChange={(val) => updateSubActivity(val)} selectedValue={subActivity}>
                        {SubActivities(activity).map(sub => (
                            <PickerItem label={sub} value={sub}/>
                        ))}
                    </Picker>
                    : undefined
            }

            <TimerButton onPress={goToTimer}>Start</TimerButton>
            <TimerButton onPress={() => useNavigation().navigate('Dashboard')}>Cancel</TimerButton>
        </View>
    );
};

const SubActivities = (activity: ComplexActivityType): string[] => {
    if (activity === ActivityType.Pieces) {
        return pieces.map(piece => piece.name);
    } else {
        return ['arpeggio', 'scales', 'other'];
    }
};
