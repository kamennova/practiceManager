import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { AppPaddingStyle, ListItemTitleStyle } from "../../AppStyle";
import { SessionPlan } from "../../types/SessionPlan";
import { AddButton } from "../basic/Buttons/AddButton";
import { ListItemWrapper } from "../basic/Lists/ListItem";
import { ScreenWrapper } from "../basic/ScreenWrapper";
import { ScreenTitle } from "../basic/Titles/Titles";

// todo: bind in app blocks props.nav
export const SessionPlansList = (props: { plans: SessionPlan[] }) => {
    const nav = useNavigation();

    return (
        <ScreenWrapper>
            <View style={{
                ...AppPaddingStyle,
            }}>
                <View style={{
                    marginBottom: 20,
                }}>
                    <ScreenTitle>Session plans</ScreenTitle>
                    <AddButton style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                    }} onPress={() => nav.navigate('SessionPlanForm')}/>
                </View>
                {props.plans.map(plan => (
                    <SessionPlanItem plan={plan} onPress={() => nav.navigate('SessionPlan', { plan: plan })}/>
                ))}
            </View>
        </ScreenWrapper>
    );
};

const SessionPlanItem = (props: { plan: SessionPlan, onPress: () => void }) => {
    const piecesTime = props.plan.piecesDuration();
    const techniqueTime = props.plan.techniqueDuration();

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

