import React, { useState } from "react";
import { Text, TextInput, TouchableNativeFeedback, View, StyleSheet } from "react-native";
import { CheckIcon } from "./icons/Check";
import { PenIcon } from "./icons/Pen";

const padding = 12;

export const Note = (props: { addedOn: Date, content: string, onUpdate?: () => void }) => {
    const [content, updateContent] = useState(props.content);
    const [isEditing, updateIsEditing] = useState(false);

    const onSubmit = () => {
        updateIsEditing(false);
    };

    const onEdit = () => {
        updateIsEditing(true);
    };

    return (
        <View>
            <View style={styles.note}>

                <TextInput multiline={true}
                           autoFocus={true}
                           editable={isEditing}
                           onChangeText={text => updateContent(text)}
                           style={styles.noteText} value={content}/>

                {isEditing ? <SubmitIcon onSubmit={onSubmit}/> : <EditIcon onEdit={onEdit}/>}

            </View>
            <Text style={styles.date}>
                {props.addedOn.toDateString()}
            </Text>
        </View>
    );
};

const EditIcon = (props: { onEdit: () => void }) => (
    <TouchableNativeFeedback onPress={props.onEdit}>
        <View style={styles.edit}>
            <PenIcon style={{ width: 20, height: 20 }}/>
        </View>
    </TouchableNativeFeedback>
);

const SubmitIcon = (props: { onSubmit: () => void }) => (
    <TouchableNativeFeedback onPress={props.onSubmit}>
        <View style={styles.edit}>
            <CheckIcon style={{ width: 20, height: 20 }}/>
        </View>
    </TouchableNativeFeedback>
);

const styles = StyleSheet.create({
    note: { borderWidth: 1, borderColor: 'lightgrey', padding: padding, paddingRight: 40 },
    date: { color: 'grey', marginTop: 3 },
    edit: {
        position: 'absolute',
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        right: padding,
        top: padding
    },
    noteText: { fontSize: 16, lineHeight: 22 },
});
