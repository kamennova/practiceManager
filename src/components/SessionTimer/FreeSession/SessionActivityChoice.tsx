import React, { useState } from 'react';
import { Route, View } from "react-native";
import { FullScreenModalStyle } from "../../../AppStyle";
import { FREE_SESSION_TIMER } from "../../../NavigationPath";
import { Activity, ActivityType, Exercise, Tonality } from "../../../types/Activity";
import { getActivity, NoBreakActivity, NoBreakActivityInput } from "../../../types/ActivityInput";
import { ActionButton } from "../../basic/Buttons/ActionButton";
import { MinorButton } from "../../basic/Buttons/Button";
import { ComplexActivityFields } from "../../basic/ComplexActivityFields";
import { ActivityTypeSelect } from "../../basic/Inputs/ActivityTypeSelect";
import { ModalSmallTitle, ModalTitle } from "../../basic/Titles/ModalTitle";

type ChoiceProps = {
    route: Route & {params: {isFirstActivity?: boolean}},
    navigation: any,
};

const BaseActivity: Activity = { type: ActivityType.Technique };

export const SessionActivityChoice = (props: ChoiceProps) => {
    const [activity, setActivity] = useState<NoBreakActivityInput>(BaseActivity);
    const isFirstActivity = props.route.params.isFirstActivity;

    const setType = (type: NoBreakActivity) => setActivity({ ...activity, type }),
        setTonality = (tonality: Tonality) => setActivity({ ...activity, tonality }),
        setExercise = (exercise: Exercise) => setActivity({ ...activity, exercise }),
        setPieceId = (pieceId: number) => setActivity({ ...activity, pieceId });

    const goToTimer = () => isFirstActivity ?
        props.navigation.replace(FREE_SESSION_TIMER, { activity: getActivity(activity) }) :
        props.navigation.navigate(FREE_SESSION_TIMER, { activity: getActivity(activity) });

    return (
        <View style={FullScreenModalStyle}>
            <ModalSmallTitle>Free session</ModalSmallTitle>
            <ModalTitle> What are you up for? </ModalTitle>

            <View style={{ paddingLeft: 50, paddingRight: 50, }}>
                <ActivityTypeSelect noBreak={true}
                                    onChooseType={(type) => setType(type as NoBreakActivity)}
                                    wrapStyle={{ marginBottom: 20 }}
                                    activeType={activity.type}/>

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
