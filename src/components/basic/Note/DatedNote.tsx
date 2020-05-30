import React from "react";
import { Text, View, ViewStyle } from "react-native";
import { NotesStyle as getStyles } from "../../../AppStyle";
import { useTheme } from "../../../theme";
import { NoteItem, NoteProps } from "./NoteItem";

type DatedNoteProps = NoteProps & {
    wrapStyle?: ViewStyle,
}

export const DatedNote = (props: DatedNoteProps) => {
    const styles = getStyles(useTheme().colors);

    return (
        <View style={{ ...styles.wrap, ...props.wrapStyle }}>
            <NoteItem addedOn={props.addedOn} content={props.content} onDelete={props.onDelete}/>

            <Text style={styles.date}>{props.addedOn.toDateString()}</Text>
        </View>
    );
};
