import React, { useState } from "react";
import { Text, TouchableNativeFeedback, View } from "react-native";
import { ActivityForm as styles } from "../../AppStyle";
import { Activity, ActivityType, Exercise, Tonality } from "../../types/Activity";
import { MinorButton } from "../basic/Buttons/Button";
import { ComplexActivityFields } from "../basic/ComplexActivityFields";
import { NumberInput } from "../basic/Inputs/NumberInput";

type BlockFormProps = {
    onSave: (_: Activity) => void,
}

const BaseActivity: Activity = { type: ActivityType.Break, duration: 3 };

export const ActivityForm = (props: BlockFormProps) => {
    const [showForm, setShowForm] = useState(false);
    const [activity, setActivity] = useState<Activity>(BaseActivity);

    const chooseType = (type: ActivityType) => {
        setActivity({ ...activity, type });
        setShowForm(true);
    };

    const setDuration = (mins: number) => setActivity({ ...activity, duration: mins }),
        setTonality = (tonality: Tonality) => setActivity({ ...activity, tonality }),
        setExercise = (exercise: Exercise) => setActivity({ ...activity, exercise }),
        setPieceId = (pieceId: number) => setActivity({ ...activity, pieceId });

    const reset = () => {
        setActivity(BaseActivity);
        setShowForm(false);
    };

    const onSave = () => {
        props.onSave(activity);
        reset();
    };

    return (
        <View style={styles.wrap}>
            <View style={styles.formWrap}>
                {showForm ?
                    [
                        <View style={{ flexDirection: 'row' }}>

                            {activity.type === ActivityType.Break ? <Text>Break</Text> :
                                <ComplexActivityFields type={activity.type}
                                                       exercise={activity.exercise} setExercise={setExercise}
                                                       tonality={activity.tonality} setTonality={setTonality}
                                                       pieceId={activity.pieceId} setPieceId={setPieceId}/>}

                            <NumberInput onChange={setDuration} value={activity.duration} measure='m'
                                         measurePlural='m'/>
                        </View>,
                        <FormButtons onCancel={() => reset()} onSave={onSave}/>
                    ]
                    : <ActivityChoice onChooseType={chooseType}/>
                }
            </View>
        </View>
    );
};

const ActivityChoice = (props: { onChooseType: (_: ActivityType) => void }) => (
    <View style={styles.formWrap}>
        <View style={styles.btnWrap}>
            {activities.map(act => <ActivityBtn label={act} onPress={() => props.onChooseType(act)}/>)}
        </View>
        <Text style={styles.choosePrompt}>Choose activity</Text>
    </View>
);

const activities = [ActivityType.Technique, ActivityType.Piece, ActivityType.SightReading, ActivityType.Break];

const ActivityBtn = (props: { label: string, onPress: () => void }) => (
    <TouchableNativeFeedback onPress={props.onPress}>
        <View style={styles.activityBtn}>
            <Text style={styles.activityBtnText}>{props.label}</Text>
        </View>
    </TouchableNativeFeedback>
);

const FormButtons = (props: { onSave: () => void, onCancel: () => void }) => (
    <View style={styles.add}>
        <MinorButton onPress={props.onCancel}>Cancel</MinorButton>
        <TouchableNativeFeedback onPress={props.onSave}>
            <View>
                <Text style={styles.text}>Ok</Text>
            </View>
        </TouchableNativeFeedback>
    </View>
);
