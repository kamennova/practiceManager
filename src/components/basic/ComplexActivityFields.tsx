import React from "react";
import { View } from "react-native";
import { ActivityType, ComplexActivityType, Exercise, Tonality } from "../../types/Activity";
import { MyPicker } from "./Inputs/Picker";

type FieldsProps = {
    type: ComplexActivityType,

    exercise?: Exercise,
    setExercise: (_: Exercise) => void,
    tonality?: Tonality,
    setTonality: (_: Tonality) => void,

    pieceId?: number,
    setPieceId: (_: number) => void,
};

export const ComplexActivityFields = (props: FieldsProps) => (
    <View style={{flexDirection: 'row'}}>
        {props.type === ActivityType.Technique ? [
                <MyPicker selected={props.exercise}
                          items={exercises}
                          onValueChange={props.setExercise}
                          wrapperStyle={{ marginBottom: 0, marginRight: -1 }}/>,

                <MyPicker selected={props.tonality}
                          items={tonalities}
                          onValueChange={props.setTonality}
                          wrapperStyle={{ marginBottom: 0 }}/>
            ] :
            <MyPicker items={[]} selected={0} onValueChange={props.setPieceId}/>}
    </View>
);

const exercises = [
    { val: 'Scales', label: 'Scales' },
    { val: 'Arpeggio', label: 'Arpeggio' },
    { val: 'Chords', label: 'Chords' },
    { val: undefined, label: 'Other' },
];

const tonalities = [{ val: undefined, label: 'Tonality' }, { val: 'C#', label: 'C#' }];
