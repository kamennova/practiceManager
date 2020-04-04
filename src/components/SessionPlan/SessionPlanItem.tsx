import React from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { ListItemTitleStyle } from "../../AppStyle";
import { piecesDuration, SessionPlan, techniqueDuration } from "../../types/SessionPlan";
import { ListItemWrapper } from "../basic/Lists/ListItem";

export const SessionPlanItem = (props: { plan: SessionPlan, onPress: () => void }) => {
    const piecesTime = piecesDuration(props.plan);
    const techniqueTime = techniqueDuration(props.plan);

    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View>
                <ListItemWrapper>
                    <Text style={{
                        ...ListItemTitleStyle,
                        marginBottom: 13
                    }}>
                        {props.plan.name}
                    </Text>
                    <Text style={{
                        color: 'grey'
                    }}>
                        {piecesTime > 0 ? <Text>{piecesTime}m pieces</Text> : undefined}
                        <Text style={{
                            fontSize: 11,
                            lineHeight: 18,
                        }}> ● </Text>
                        {techniqueTime > 0 ? <Text>{piecesTime}m technique</Text> : undefined}
                    </Text>
                </ListItemWrapper>
            </View>
        </TouchableWithoutFeedback>
    );
};
