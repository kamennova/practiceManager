import React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { TimerTitleStyle as getStyles } from "../../AppStyle";
import { StateShape } from "../../store/StoreState";
import { Activity } from "../../types/activity";
import { getPieceCredits, getTimerActivityTitle, PieceCredits } from "common/utils/title";
import { getActivityColor } from "./Colors";

const SessionActivityTitleComponent = (props: { activity: Activity, pieceCredits?: PieceCredits }) => {
    const color = getActivityColor(props.activity.type);
    const styles = getStyles(color);
    const title = getTimerActivityTitle(props.activity, props.pieceCredits);

    return (
        <View style={styles.wrap}>
            <Text style={styles.mainTitle}>
                {title.main}
            </Text>
            {title.small !== undefined ? <SmallTitle color={color}>{title.small}</SmallTitle> : undefined}
        </View>
    );
};

const mapStateToProps = (state: StateShape, ownProps: { activity: Activity }) => ({
    pieceCredits: getPieceCredits(state.pieces.items, ownProps.activity.pieceId),
});

export const SessionActivityTitle = connect(mapStateToProps)(SessionActivityTitleComponent);

const SmallTitle = (props: { children: string, color: string }) => (
    <Text style={getStyles(props.color).smallTitle}>
        {props.children}
    </Text>
);
