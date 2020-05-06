import React from 'react';
import { Text, TouchableWithoutFeedback, View } from "react-native";

type NotesProps = {
    notes: string[],
    onAdd: (_: string) => void,
};

export const TimerNotes = (props: NotesProps) => {

    return (
        <View>
            <AddNoteButton onAdd={props.onAdd}/>
        </View>
    );
};

const AddNoteButton = (props: { onAdd: () => void }) => (
    <TouchableWithoutFeedback onPress={props.onAdd}>
        <View>
            <Text style={{ textDecorationLine: 'underline' }}>+ Add note</Text>
        </View>
    </TouchableWithoutFeedback>
);
