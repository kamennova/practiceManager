import * as React from "react";
import { Text, ViewStyle } from "react-native";
import { ActionBtnStyle as styles } from "../../../AppStyle";
import { CheckIcon } from "../icons/Check";
import { PlayIcon } from "../icons/PlayIcon";
import { Button } from "./Button";

export const AddButton = (props: { onPress: () => void }) => (
    <Button style={styles.add} onPress={props.onPress} label='Add' icon={<Text style={styles.plus}>+</Text>}/>
);

export const SaveButton = (props: { onPress: () => void, style?: ViewStyle }) => (
    <Button style={{ ...styles.save, ...props.style }} onPress={props.onPress} label='Save'
            icon={<CheckIcon style={styles.check}/>}/>
);

export const StartButton = (props: { onPress?: () => void, style?: ViewStyle }) => (
    <Button style={props.style} onPress={props.onPress} label='Start session'
            icon={<PlayIcon color='white' style={{ marginRight: 10 }}/>}/>
);
