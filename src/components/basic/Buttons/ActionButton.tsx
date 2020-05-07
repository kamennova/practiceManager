import * as React from "react";
import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { ActionBtnStyle as styles } from "../../../AppStyle";
import { CheckIcon } from "../icons/Check";
import { PlayIcon } from "../icons/PlayIcon";

type BtnProps = {
    onPress?: () => void,
    label: string,
    icon?: JSX.Element,
    style?: ViewStyle,
}

export const ActionButton = (props: BtnProps) => (
    <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={{ ...styles.wrap, ...props.style }}>
            {props.icon}
            <Text style={styles.text}>{props.label}</Text>
        </View>
    </TouchableWithoutFeedback>
);

export const AddButton = (props: { onPress: () => void }) => (
    <ActionButton style={styles.add} onPress={props.onPress} label='Add' icon={<Text style={styles.plus}>+</Text>}/>
);

export const SaveButton = (props: { onPress: () => void, style?: ViewStyle }) => (
    <ActionButton style={{ ...styles.save, ...props.style }} onPress={props.onPress} label='Save'
                  icon={<CheckIcon style={styles.check}/>}/>
);

export const StartButton = (props: { onPress?: () => void, style?: ViewStyle }) => (
    <ActionButton style={props.style} onPress={props.onPress} label='Start session'
                  icon={<PlayIcon color='white' style={{ marginRight: 12 }}/>}/>
);
