import * as React from "react";
import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { ActionBtnStyle as getStyle, Dark } from "../../../AppStyle";
import { useTheme } from "../../../theme";
import { CheckIcon } from "../icons/Check";
import { PlayIcon } from "../icons/PlayIcon";

type BtnProps = {
    onPress?: () => void,
    label: string,
    icon?: JSX.Element,
    style?: ViewStyle,
}

export const ActionButton = (props: BtnProps) => {
    const themeObj = useTheme();
    const style = getStyle(themeObj.theme);

    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={{ ...style.wrap, ...props.style }}>
                {props.icon}
                <Text style={style.text}>{props.label}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
};

export const AddButton = (props: { onPress: () => void }) => {
    return (
        <ActionButton style={getStyle().add} onPress={props.onPress} label='Add'
                      icon={<Text style={getStyle().plus}>+</Text>}/>
    )
};

export const SaveButton = (props: { onPress: () => void, style?: ViewStyle }) => (
    <ActionButton style={{ ...getStyle().save, ...props.style }} onPress={props.onPress} label='Save'
                  icon={<CheckIcon style={getStyle().check}/>}/>
);

export const StartButton = (props: {onPress?: () => void, style?: ViewStyle}) => (
    <ActionButton style={props.style}
                  onPress={props.onPress} label='Start session'
                  icon={<PlayIcon color={Dark} style={{marginRight: 12}} />}/>
);
