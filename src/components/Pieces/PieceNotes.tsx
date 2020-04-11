import React from "react";
import { Text } from "react-native";
import { NoteText } from "../../AppStyle";
import { useTheme } from "../../theme";
import { Note as NoteType } from "../../types/Note";
import { ItemSection } from "../basic/ItemSection";
import { Note } from "../basic/Note";

export const PieceNotes = (props: { notes: NoteType[] }) => {
    return (
        <ItemSection title='Notes'>
            {props.notes.length === 0 ?
                <Text style={NoteText(useTheme().colors)}>No notes for this piece yet</Text>
                : props.notes.map(note => <Note {...note}/>)}
        </ItemSection>
    );
};
