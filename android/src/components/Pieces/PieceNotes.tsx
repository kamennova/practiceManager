import React from "react";
import { Text } from "react-native";
import { NoteText } from "../../AppStyle";
import { useTheme } from "../../theme";
import { Note } from "../../types/Note";
import { useDeviceSize } from "../basic/adaptive/query";
import { ItemSection } from "../basic/ItemSection";
import { DatedNote } from "../basic/Note";
import { AddNoteBtn } from "../basic/Note/AddNoteBtn";

type NotesProps = {
    notes: Note[],
    onShowForm: () => void,
    onDeleteNote: (index: number) => void,
}

export const PieceNotes = (props: NotesProps) => {
    const style = NoteText(useTheme().colors, useDeviceSize());

    return (
        <ItemSection title='Notes' activeElem={<AddNoteBtn onPress={props.onShowForm}/>}>
            {props.notes.length === 0 ?
                <Text style={style}>No notes for this piece yet</Text> :
                props.notes.map((note) =>
                    <DatedNote onDelete={() => props.onDeleteNote(note.id)} {...note}/>)}
        </ItemSection>
    );
};
