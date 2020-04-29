import React from "react";
import { Text, View, ViewStyle } from "react-native";
import { ActivityBlockStyle as getStyles } from "../../AppStyle";
import { useTheme } from "../../theme";
import { ActivityType } from "../../types/Activity";
import { PlanActivity } from "../../types/PlanActivity";
import { formatMinutesShort } from "../../utils/time";

export type BlockProps = {
    activity: PlanActivity,
    style?: ViewStyle,
    isLast: boolean,
    isFirst: boolean,
    children?: JSX.Element[],
}

export const ActivityBlock = (props: BlockProps) => {
    const styles = getStyles(useTheme().colors);

    return (
        <View style={{ ...styles.wrap, ...props.style }}>
            <View style={styles.textWrap}>
                <Text numberOfLines={1} style={styles.name}>{getTitle(props.activity)}</Text>
            </View>
            <View style={styles.rightWrap}>
                <View style={styles.textWrap}>
                    <Text style={styles.duration}>{formatMinutesShort(props.activity.duration)}</Text>
                </View>
                {props.children}
            </View>
        </View>
    );
};

const getTitle = (activity: PlanActivity): string => {
    switch (activity.type) {
        case ActivityType.Break:
            return ActivityType.Break;
        case ActivityType.SightReading:
            return 'Sight reading' + (activity.pieceId !== undefined ? ': Piece name, author' : '');
        case ActivityType.Piece:
            return (activity.pieceId !== undefined ? 'Piece name, author' : activity.type);
        case ActivityType.Technique:
            return (activity.exercise !== undefined ? activity.exercise : activity.type) +
                (activity.tonality !== undefined ? ' ' + activity.tonality : '');
    }
};
