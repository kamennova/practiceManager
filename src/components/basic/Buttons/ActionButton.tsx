import * as React from "react";
import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { ActionBtnStyle as style } from "../../../AppStyle";
import { CheckIcon } from "../icons/Check";

type BtnProps = {
    onPress: () => void,
    label: string,
    icon?: JSX.Element,
    style?: ViewStyle,
}

const ActionButton = (props: BtnProps) => (
    <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={{ ...style.wrap, ...props.style }}>
            {props.icon}
            <Text style={style.text}>{props.label}</Text>
        </View>
    </TouchableWithoutFeedback>
);

export const AddButton = (props: { onPress: () => void }) => (
    <ActionButton style={style.add} onPress={props.onPress} label='Add' icon={<Text style={style.plus}>+</Text>}/>
);

export const SaveButton = (props: { onPress: () => void }) => (
    <ActionButton style={style.save} onPress={props.onPress} label='Save' icon={<CheckIcon style={style.check}/>}/>
);

