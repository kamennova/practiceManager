import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { ActivityType, ComplexActivityType, Exercise, Tonality } from "../../types/activity";
import { enumKeys } from "common/utils/array";
import { MyPicker } from "./inputs/Picker";
import { PiecePicker } from "./inputs/PiecePicker";

type FieldsProps = {
    type: ComplexActivityType,
    style?: ViewStyle,

    exercise?: Exercise,
    setExercise: (_: Exercise) => void,
    tonality?: Tonality,
    setTonality: (_: Tonality) => void,

    pieceId?: number,
    setPieceId: (_: number) => void,
};

export const ComplexActivityFields = (props: FieldsProps) => {
    const wrapStyle = { ...styles.wrap, ...props.style };

    return (
        <View style={wrapStyle}>
            {props.type === ActivityType.Technique ? [
                    <MyPicker selected={props.exercise}
                              items={exercises}
                              onValueChange={props.setExercise}
                              wrapperStyle={styles.exerciseWrap}/>,

                    <MyPicker selected={props.tonality}
                              items={tonalities}
                              onValueChange={props.setTonality}
                              wrapperStyle={styles.tonalityWrap}/>
                ] :
                <PiecePicker pieceId={props.pieceId} onChoose={props.setPieceId}/>}
        </View>
    );
};

const exercises = [
    { val: undefined, label: 'Exercise' },
    ...enumKeys(Exercise).map((item) => ({ val: item, label: item })),
];

const tonalities = [
    { val: undefined, label: 'Tonality' },
    ...enumKeys(Tonality).map((item) => ({ val: item, label: item })),
];

const styles = StyleSheet.create({
    wrap: { flexDirection: 'row', width: '100%', },
    tonalityWrap: { marginBottom: 0, width: 180, },
    exerciseWrap: { marginBottom: 0, marginRight: -1 },
});
