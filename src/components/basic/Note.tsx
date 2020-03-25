import React, { useState } from "react";
import { Text, TextInput, TouchableNativeFeedback, View, ViewStyle } from "react-native";
import { CheckIcon } from "../icons/Check";
import { PenIcon } from "../icons/Pen";

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
        <View style={{ marginBottom: 15 }}>
            <View style={{ borderWidth: 1, borderColor: 'lightgrey', padding: padding, paddingRight: 40 }}>

                <TextInput multiline={true}
                           autoFocus={true}
                           editable={isEditing}
                           onChangeText={text => updateContent(text)}
                           style={{ fontSize: 16, lineHeight: 22 }} value={content}/>

                {isEditing ? <SubmitIcon onSubmit={onSubmit}/> : <EditIcon onEdit={onEdit}/>}

            </View>
            <Text style={{ color: 'grey', marginTop: 3 }}>
                {props.addedOn.toDateString()}
            </Text>
        </View>
    );
};

const styles: ViewStyle = {
    position: 'absolute',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    right: padding,
    top: padding
};

const EditIcon = (props: { onEdit: () => void }) => (
    <TouchableNativeFeedback onPress={props.onEdit}>
        <View style={styles}>
            <PenIcon style={{ width: 20, height: 20 }}/>
        </View>
    </TouchableNativeFeedback>
);

const SubmitIcon = (props: { onSubmit: () => void }) => (
    <TouchableNativeFeedback onPress={props.onSubmit}>
        <View style={styles}>
            <CheckIcon style={{ width: 20, height: 20 }}/>
        </View>
    </TouchableNativeFeedback>
);
