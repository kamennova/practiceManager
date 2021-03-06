import React, { useState } from 'react';
import { Route, ScrollView, View } from "react-native";
import { FullScreenModalStyle } from "../../../AppStyle";
import { FREE_SESSION_TIMER } from "../../../NavigationPath";
import {
    Activity,
    ActivityType,
    Exercise,
    getActivity,
    NoBreakActivity,
    NoBreakActivityInput,
    Tonality
} from "../../../types/activity";
import { Button, MinorButton } from "../../basic/buttons/Button";
import { ComplexActivityFields } from "../../basic/ComplexActivityFields";
import { ActivityTypeSelect } from "../../basic/inputs/ActivityTypeSelect";
import { ModalSmallTitle, ModalTitle } from "../../basic/titles/ModalTitle";

type ChoiceProps = {
    route: Route & { params?: { isFirstActivity: boolean } },
    navigation: any,
};

const BaseActivity: Activity = { type: ActivityType.Technique };

export const SessionActivityChoice = (props: ChoiceProps) => {
    const [activity, setActivity] = useState<NoBreakActivityInput>(BaseActivity);
    const isFirstActivity = props.route.params?.isFirstActivity !== undefined && props.route.params.isFirstActivity;

    const setType = (type: NoBreakActivity) => setActivity({ ...activity, type }),
        setTonality = (tonality: Tonality) => setActivity({ ...activity, tonality }),
        setExercise = (exercise: Exercise) => setActivity({ ...activity, exercise }),
        setPieceId = (pieceId: number) => setActivity({ ...activity, pieceId });

    const goToTimer = () => isFirstActivity ?
        props.navigation.replace(FREE_SESSION_TIMER, { activity: getActivity(activity) }) :
        props.navigation.navigate(FREE_SESSION_TIMER, { activity: getActivity(activity) });

    return (
        <ScrollView keyboardShouldPersistTaps='handled'>

            <View style={FullScreenModalStyle}>
                <ModalSmallTitle>Free session</ModalSmallTitle>
                <ModalTitle> What are you up for? </ModalTitle>
                <View style={{ paddingLeft: 30, paddingRight: 30 }}>
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
                    <Button style={{ position: 'relative' }} label={'Start'} onPress={goToTimer}/>
                </View>
            </View>
        </ScrollView>
    );
};
