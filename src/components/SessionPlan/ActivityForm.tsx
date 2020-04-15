import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableNativeFeedback, View } from "react-native";
import { ActivityForm as getStyles, Dark } from "../../AppStyle";
import { useTheme } from "../../theme";
import { ActivityType, Exercise, Tonality } from "../../types/Activity";
import { getPlanActivity, PlanActivityInput } from "../../types/ActivityInput";
import { PlanActivity } from "../../types/PlanActivity";
import { ComplexActivityFields } from "../basic/ComplexActivityFields";
import { ActivityTypeSelect } from "../basic/Inputs/ActivityTypeSelect";
import { DurationInput } from "../basic/Inputs/DurationInput";

type BlockFormProps = {
    onSave: (_: PlanActivity) => void,
    onClose: () => void,
    activity?: PlanActivity,
};

const BaseActivity = { type: ActivityType.Break, duration: 3 };

export const ActivityForm = (props: BlockFormProps) => {
    const [activity, setActivity] = useState<PlanActivityInput>(props.activity !== undefined ? props.activity : BaseActivity);

    const chooseType = (type: ActivityType) => {
        setActivity({ ...activity, type });
    };

    const setDuration = (mins: number) => setActivity({ ...activity, duration: mins }),
        setTonality = (tonality: Tonality) => setActivity({ ...activity, tonality }),
        setExercise = (exercise: Exercise) => setActivity({ ...activity, exercise }),
        setPieceId = (pieceId: number) => setActivity({ ...activity, pieceId });

    const reset = () => {
        setActivity(BaseActivity);
        props.onClose();
    };

    const onSave = () => props.onSave(getPlanActivity(activity));

    const styles = getStyles(useTheme().colors);

    return (
        <View style={styles.modalWrap}>
            {props.activity === undefined ?
                <ActivityTypeSelect onChooseType={chooseType} activeType={activity.type}/> : undefined}

            {activity.type === ActivityType.Break ?
                <View style={styles.breakWrap}><Text style={styles.breakText}>Break</Text></View> :
                <ComplexActivityFields type={activity.type} style={styles.fieldsPadding}
                                       exercise={activity.exercise} setExercise={setExercise}
                                       tonality={activity.tonality} setTonality={setTonality}
                                       pieceId={activity.pieceId} setPieceId={setPieceId}/>}

            <View style={styles.bottomWrap}>
                <DurationInput minutes={15} onChange={() => {
                }}/>
                <AddButton onCancel={reset} onSave={onSave}/>
            </View>
        </View>
    );
};

const AddButton = (props: { onSave: () => void, onCancel: () => void }) => {
    const styles = getStyles(useTheme().colors);

    return (
        <TouchableNativeFeedback onPress={props.onSave}>
            <View style={styles.add}>
                <Ionicons name='md-send' size={20} color={Dark}/>
                <Text style={styles.text}>Ok</Text>
            </View>
        </TouchableNativeFeedback>
    );
};
