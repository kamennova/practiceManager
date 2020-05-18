import React from "react";
import { Text, TouchableNativeFeedback, View } from "react-native";
import { useTheme } from "../../theme";
import { TrashIcon } from "./icons/Trash";
import { NotesStyle as getStyles } from "../../AppStyle";

export const Note = (props: { addedOn: Date, content: string, onDelete?: () => void }) => {
    const styles = getStyles(useTheme().colors);

    return (
        <View style={styles.wrap}>
            <View style={styles.note}>
                <Text style={styles.noteText}>{props.content}</Text>
                <DeleteBtn onDelete={props.onDelete}/>
            </View>
            <Text style={styles.date}>
                {props.addedOn.toDateString()}
            </Text>
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
