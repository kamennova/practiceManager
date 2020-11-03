import React from "react";
import { TouchableNativeFeedback, View, Text, ViewStyle } from "react-native";
import { ActivityChoiceStyle as getStyles, Dark } from "../../../AppStyle";
import { useTheme } from "../../../theme";
import { ActivityType } from "../../../types/activity";
import { BoltIcon, BreakIcon, EyeIcon, MusicIcon } from "../icons/ActivityIcons";

type ChoiceProps = {
    onChooseType: (_: ActivityType) => void,
    activeType: ActivityType,
    wrapStyle?: ViewStyle,
    noBreak?: boolean,
}

export const ActivityTypeSelect = (props: ChoiceProps) => {
    const wrapStyle = { ...getStyles(useTheme().colors).btnWrap, ...props.wrapStyle };

    return (
        <View style={wrapStyle}>
            {(props.noBreak ? noBreakActivityTypes : activityTypes).map((type) =>
                <ActivityBtn isActive={type === props.activeType}
                             type={type} onPress={() => props.onChooseType(type)}/>)}
        </View>
    )
};

type BtnProps = {
    type: ActivityType,
    onPress: () => void,
    isActive: boolean,
}

const ActivityBtn = (props: BtnProps) => {
    const colors = useTheme().colors;
    const styles = getStyles(colors);
    const icon = getActivityIcon(props.type)({ size: undefined });

    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <View style={{
                ...styles.activityBtn,
                backgroundColor: props.isActive ? colors.appBgLight : 'transparent',
                borderColor: props.isActive ? Dark : 'transparent'
            }}>
                <View style={styles.iconWrap}>{icon}</View>
                <Text style={{
                    ...styles.activityBtnText,
                    color: props.isActive ? Dark : colors.colorFaded
                }}>{props.type}</Text>
            </View>
        </TouchableNativeFeedback>
    );
};

export const getActivityIcon = (type: ActivityType) => {
    switch (type) {
        case ActivityType.Break:
            return BreakIcon;
        case ActivityType.Technique:
            return BoltIcon;
        case ActivityType.Piece:
            return MusicIcon;
        case ActivityType.SightReading:
            return EyeIcon;
    }
};

const noBreakActivityTypes = [ActivityType.Technique, ActivityType.Piece, ActivityType.SightReading];
const activityTypes = [...noBreakActivityTypes, ActivityType.Break];
