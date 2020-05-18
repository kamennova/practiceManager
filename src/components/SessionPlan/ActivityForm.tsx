import React, { useState } from "react";
import { Text, View } from "react-native";
import { ActivityForm as getStyles } from "../../AppStyle";
import { useTheme } from "../../theme";
import { ActivityType, Exercise, Tonality } from "../../types/Activity";
import { getPlanActivity, PlanActivityInput } from "../../types/ActivityInput";
import { PlanActivity } from "../../types/PlanActivity";
import { SendButton } from "../basic/buttons/SendButton";
import { ComplexActivityFields } from "../basic/ComplexActivityFields";
import { ActivityTypeSelect } from "../basic/inputs/ActivityTypeSelect";
import { DurationInput } from "../basic/inputs/DurationInput";

type BlockFormProps = {
    onSave: (_: PlanActivity) => void,
    onClose: () => void,
    activity?: PlanActivity,
};

const BaseActivity = { type: ActivityType.Break, duration: 15 * 60 };

export const ActivityForm = (props: BlockFormProps) => {
    const initAct = props.activity !== undefined ? props.activity : BaseActivity;
    const [activity, setActivity] = useState<PlanActivityInput>(initAct);

    const setType = (type: ActivityType) => setActivity({ ...activity, type }),
        setDuration = (mins: number) => setActivity({ ...activity, duration: mins * 60 }),
        setTonality = (tonality: Tonality) => setActivity({ ...activity, tonality }),
        setExercise = (exercise: Exercise) => setActivity({ ...activity, exercise }),
        setPieceId = (pieceId: number) => setActivity({ ...activity, pieceId });

    const onSave = () => props.onSave(getPlanActivity(activity));

    const styles = getStyles(useTheme().colors);

    return (
        <View style={styles.modalWrap}>
            {props.activity === undefined ?
                <ActivityTypeSelect onChooseType={setType} activeType={activity.type}/> : undefined}

            {activity.type === ActivityType.Break ?
                <View style={styles.breakWrap}><Text style={styles.breakText}>Break</Text></View> :
                <ComplexActivityFields type={activity.type} style={styles.fieldsPadding}
                                       exercise={activity.exercise} setExercise={setExercise}
                                       tonality={activity.tonality} setTonality={setTonality}
                                       pieceId={activity.pieceId} setPieceId={setPieceId}/>}

            <View style={styles.bottomWrap}>
                <DurationInput minutes={activity.duration / 60} onChange={setDuration}/>
                <SendButton onSave={onSave}/>
            </View>
        </View>
    );
};
