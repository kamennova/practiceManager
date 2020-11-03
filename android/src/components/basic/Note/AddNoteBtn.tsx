import React from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { Dark } from "../../../AppStyle";

export const AddNoteBtn = (props: { onPress?: () => void, showFullLabel?: boolean }) => (
    <TouchableNativeFeedback onPress={props.onPress}>
        <View style={styles.btn}>
            <Text style={styles.btnText}>+ Add {props.showFullLabel !== undefined && props.showFullLabel ? 'note' : '' }</Text>
        </View>
    </TouchableNativeFeedback>
);

const styles = StyleSheet.create({
    btn: {
        backgroundColor: Dark,
        padding: 7,
        paddingTop: 2,
        paddingBottom: 4,
        borderRadius: 3
    },
    btnText: {
        color: 'white',
        fontSize: 13,
    },
});
