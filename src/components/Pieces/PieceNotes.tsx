import React from "react";
import { Text, View } from "react-native";
import { Dark, NoteText } from "../../AppStyle";
import { useTheme } from "../../theme";
import { Note as NoteType } from "../../types/Note";
import { ItemSection } from "../basic/ItemSection";
import { Note } from "../basic/Note";

export const PieceNotes = (props: { notes: NoteType[] }) => {
    return (
        <ItemSection title='Notes' activeElem={<AddBtn />}>
            {props.notes.length === 0 ?
                <Text style={NoteText(useTheme().colors)}>No notes for this piece yet</Text>
                : props.notes.map(note => <Note {...note}/>)}
        </ItemSection>
    );
};

const AddBtn = () => (
    <View style={{backgroundColor: Dark, padding: 3, paddingTop: 2, paddingLeft: 7, paddingRight: 7, borderRadius: 3}}>
        <Text style={{color: 'white', fontSize: 13 }}>+ Add</Text>
    </View>
);
