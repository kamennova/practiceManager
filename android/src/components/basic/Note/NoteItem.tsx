import React from "react";
import { Text, TextStyle, TouchableNativeFeedback, View, ViewStyle } from "react-native";
import { useTheme } from "../../../theme";
import { TrashIcon } from "../icons/Trash";
import { NotesStyle as getStyles } from "../../../AppStyle";

export type NoteProps = {
    addedOn: Date,
    content: string,
    onDelete?: () => void,
    noteStyle?: ViewStyle,
    contentStyle?: TextStyle,
}

export const NoteItem = (props: NoteProps) => {
    const styles = getStyles(useTheme().colors);

    return (
            <View style={{...styles.note, ...props.noteStyle}}>
                <Text style={{...styles.noteText, ...props.contentStyle}}>{props.content}</Text>
                {props.onDelete !== undefined  ? <DeleteBtn onDelete={props.onDelete}/> : undefined}
            </View>
    );
};

const DeleteBtn = (props: { onDelete?: () => void }) => (
    <TouchableNativeFeedback onPress={props.onDelete}>
        <View style={getStyles().edit}>
            <TrashIcon size={18}/>
        </View>
    </TouchableNativeFeedback>
);
