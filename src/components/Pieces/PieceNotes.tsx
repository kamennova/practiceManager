import React from "react";
import { Text, View } from "react-native";
import { NoteText, NoteWrap } from "../../AppStyle";
import { Note as NoteType } from "../../types/Note";
import { Note } from "../basic/Note";
import { SmallTitle } from "../basic/Titles/Titles";

export const PieceNotes = (props: { notes: NoteType[] }) => {
    return (
        <View style={NoteWrap}>
            <SmallTitle>Notes</SmallTitle>

            {props.notes.length === 0 ?
                <Text style={NoteText}>No notes for this piece yet</Text>
                : undefined}

            {props.notes.map(note => <Note {...note}/>)}
        </View>
    );
};
