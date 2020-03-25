import React from "react";
import { Text, View } from "react-native";
import { AppPaddingStyle } from "../../AppStyle";
import { Note as NoteType } from "../../types/Note";
import { Note } from "../basic/Note";
import { SmallTitle } from "../basic/Titles/Titles";

export const PieceNotes = (props: { notes: NoteType[] }) => {
    return (
        <View style={{
            ...AppPaddingStyle,
            paddingBottom: 15,
            paddingTop: 20,
            borderTopWidth: 1,
            borderColor: 'lightgrey'
        }}>
            <SmallTitle>Notes</SmallTitle>

            {props.notes.length === 0 ?
                <Text style={{ fontSize: 17, color: 'rgba(0, 0, 0, 0.8)' }}>No notes for this piece yet</Text>
                : undefined}

            {props.notes.map(note => <Note {...note}/>)}
        </View>
    );
};
