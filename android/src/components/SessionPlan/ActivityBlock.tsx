import React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { ActivityBlockStyle as getStyles } from "../../AppStyle";
import { StateShape } from "../../store/StoreState";
import { useTheme } from "../../theme";
import { SessionActivity } from "../../types/activity";
import { formatMinutesShort } from "common/utils/time";
import { getActivityTitle, getPieceCredits, PieceCredits } from "common/utils/title";

export type BlockProps = {
    activity: SessionActivity,
    isLast: boolean,
    isFirst: boolean,
    children?: JSX.Element[],
    pieceCredits?: PieceCredits,
}

const ActivityBlockComponent = (props: BlockProps) => {
    const styles = getStyles(useTheme().colors);

    return (
        <View style={styles.wrap}>
            <View style={styles.textWrap}>
                <Text numberOfLines={1}
                      style={styles.name}>{getActivityTitle(props.activity, props.pieceCredits)}</Text>
            </View>
            <View style={styles.rightWrap}>
                <View style={styles.textWrap}>
                    <Text style={styles.duration}>{formatMinutesShort(props.activity.duration / 60)}</Text>
                </View>
                {props.children}
            </View>
        </View>
    );
};

const mapStateToProps = (state: StateShape, ownProps: BlockProps) => ({
    pieceCredits: getPieceCredits(state.pieces.items, ownProps.activity.pieceId),
});

export const ActivityBlock = connect(mapStateToProps)(ActivityBlockComponent);
