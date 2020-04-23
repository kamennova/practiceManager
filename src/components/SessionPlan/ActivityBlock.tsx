import React from "react";
import { Text, View, ViewStyle } from "react-native";
import { ActivityBlockStyle as getStyles } from "../../AppStyle";
import { useTheme } from "../../theme";
import { ActivityType } from "../../types/Activity";
import { Direction } from "../../types/Direction";
import { PlanActivity } from "../../types/PlanActivity";
import { ArrowIcon } from "../basic/icons/ArrowIcon";
import { DotsIcon } from "../basic/icons/DotsIcon";

type BlockProps = {
    activity: PlanActivity,
    onShowMenu: () => void,
    onMove: (pos: -1 | 1) => void,
    style?: ViewStyle,
    isLast: boolean,
    isFirst: boolean,
}

export const ActivityBlock = (props: BlockProps) => {
    const styles = getStyles(useTheme().colors);

    return (
        <View style={{ ...styles.wrap, ...props.style }}>
            <Text style={styles.name}>{getTitle(props.activity)}</Text>
            <Text style={styles.duration}>{props.activity.duration} min</Text>
            <ArrowIcon size={15}
                       wrapStyle={{ ...styles.iconStyle, opacity: props.isFirst ? 0.3 : 1 }}
                       onPress={props.isFirst ? undefined : () => props.onMove(-1)}
                       direction={Direction.Top}/>
            <ArrowIcon size={15}
                       wrapStyle={{ ...styles.iconStyle, opacity: props.isLast ? 0.3 : 1 }}
                       onPress={props.isLast ? undefined : () => props.onMove(1)}
                       direction={Direction.Bottom}/>
            <DotsIcon wrapStyle={{ width: 25, marginLeft: 10 }} onPress={props.onShowMenu}/>
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
