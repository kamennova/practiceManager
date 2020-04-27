import React from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { ListItemTitleStyle } from "../../AppStyle";
import { useTheme } from "../../theme";
import { getActivitiesReport } from "../../types/ActivitiesReport";
import { SessionPlan } from "../../types/SessionPlan";
import { ListItemWrapper } from "../basic/Lists/ListItem";

export const SessionPlanItem = (props: { plan: SessionPlan, onPress: () => void }) => {
    const colors = useTheme().colors;
    const report = getActivitiesReport(props.plan.schedule);

    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View>
                <ListItemWrapper>
                    <Text style={{
                        ...ListItemTitleStyle,
                        marginBottom: 10,
                        color: colors.color,
                    }}>
                        {props.plan.name}
                    </Text>
                    <Text style={{
                        color: 'grey'
                    }}>
                        {report.pieces > 0 ? <Text>{report.pieces}m pieces</Text> : undefined}
                        <Text style={{
                            fontSize: 11,
                            lineHeight: 18,
                        }}>    ●    </Text>
                        {report.technique > 0 ? <Text>{report.technique}m technique</Text> : undefined}
                    </Text>
                </ListItemWrapper>
            </View>
        </TouchableWithoutFeedback>
    );
};
