import React, { useState } from 'react';
import { Route, View } from "react-native";
import { FullScreenModalStyle } from "../../AppStyle";
import { FREE_SESSION_TIMER } from "../../NavigationPath";
import { Activity, ActivityType, Exercise, Tonality } from "../../types/Activity";
import { NoBreakActivity, NoBreakActivityInput } from "../../types/ActivityInput";
import { ActionButton } from "../basic/Buttons/ActionButton";
import { MinorButton } from "../basic/Buttons/Button";
import { ComplexActivityFields } from "../basic/ComplexActivityFields";
import { MyPicker } from "../basic/Inputs/Picker";
import { ModalSmallTitle, ModalTitle } from "../basic/Titles/ModalTitle";

type ChoiceProps = {
    route: Route,
    navigation: any,
};

const BaseActivity: Activity = { type: ActivityType.Technique, tonality: 'C#' as Tonality, exercise: Exercise.Scales };

export const FreeSessionActivityChoice = (props: ChoiceProps) => {
    const [activity, setActivity] = useState<NoBreakActivityInput>(BaseActivity);

    const setType = (type: NoBreakActivity) => setActivity({ ...activity, type }),
        setTonality = (tonality: Tonality) => setActivity({ ...activity, tonality }),
        setExercise = (exercise: Exercise) => setActivity({ ...activity, exercise }),
        setPieceId = (pieceId: number) => setActivity({ ...activity, pieceId });

    const goToTimer = () => {
        props.navigation.navigate(FREE_SESSION_TIMER, { activity: getActivity(activity) });
    };

    return (
        <View style={FullScreenModalStyle}>
            <ModalSmallTitle>Free session</ModalSmallTitle>
            <ModalTitle> What are you up for? </ModalTitle>

            <View style={{ paddingLeft: 50, paddingRight: 50, }}>
                <MyPicker items={activityItems} onValueChange={setType} selected={activity.type}/>

                <ComplexActivityFields type={activity.type}
                                       exercise={activity.exercise} setExercise={setExercise}
                                       pieceId={activity.pieceId} setPieceId={setPieceId}
                                       tonality={activity.tonality} setTonality={setTonality}/>
            </View>

            <View style={{
                marginTop: 'auto',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <MinorButton onPress={() => props.navigation.goBack()}>Cancel</MinorButton>
                <ActionButton style={{ position: 'relative' }} label={'Start'} onPress={goToTimer}/>
            </View>
        </View>
    );
};

const getActivity = (act: NoBreakActivityInput): Activity => {
    switch (act.type) {
        case ActivityType.Piece:
        case ActivityType.SightReading:
            return { type: act.type, pieceId: act.pieceId };
        case ActivityType.Technique:
            return { type: act.type, exercise: act.exercise, tonality: act.tonality };
    }
};

const activityItems = [ActivityType.Piece, ActivityType.Technique, ActivityType.SightReading].map(
    (activity) => ({ val: activity, label: activity })
);
