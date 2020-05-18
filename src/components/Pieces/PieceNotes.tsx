import React from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { Dark, NoteText } from "../../AppStyle";
import { useTheme } from "../../theme";
import { Note as NoteType } from "../../types/Note";
import { ItemSection } from "../basic/ItemSection";
import { Note } from "../basic/Note";

type NotesProps = {
    notes: NoteType[],
    onShowForm: () => void,
    onDeleteNote: (index: number) => void,
}

export const PieceNotes = (props: NotesProps) => {
    return (
        <ItemSection title='Notes' activeElem={<AddBtn onPress={props.onShowForm}/>}>
            {props.notes.length === 0 ?
                <Text style={NoteText(useTheme().colors)}>No notes for this piece yet</Text>
                : props.notes.map((note, i) => <Note onDelete={() => props.onDeleteNote(i)} {...note}/>)}
        </ItemSection>
    );
};

const AddBtn = (props: { onPress?: () => void, }) => (
    <TouchableNativeFeedback onPress={props.onPress}>
        <View style={styles.btn}>
            <Text style={styles.btnText}>+ Add</Text>
        </View>
    </TouchableNativeFeedback>
);

const styles = StyleSheet.create({
    btn: {
        backgroundColor: Dark,
        padding: 3,
        paddingTop: 2,
        paddingLeft: 7,
        paddingRight: 7,
        borderRadius: 3
    },
    btnText: {
        color: 'white',
        fontSize: 13,
    },
});
