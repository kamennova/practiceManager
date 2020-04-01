import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { connect } from "react-redux";
import { AppPaddingStyle, ListItemTitleStyle } from "../../AppStyle";
import { SESSION_PLAN, SESSION_PLAN_FORM } from "../../NavigationPath";
import { StateShape } from "../../store/StoreState";
import { SessionPlan } from "../../types/SessionPlan";
import { AddButton } from "../basic/Buttons/ActionButton";
import { ListItemWrapper } from "../basic/Lists/ListItem";
import { ScreenWrapper } from "../basic/ScreenWrapper";
import { StackActions } from '@react-navigation/native';

const mapStateToProps = (state: StateShape) => ({
    plans: state.plans.items,
});

// todo: bind in app blocks props.nav
const SessionPlans = (props: { plans: SessionPlan[] }) => {
    const nav = useNavigation();

    return (
        <ScreenWrapper>
            <View style={AppPaddingStyle}>
                <AddButton onPress={() => nav.dispatch(StackActions.push(SESSION_PLAN_FORM))}/>
                {props.plans.map(plan => (
                    <SessionPlanItem plan={plan} onPress={() => nav.navigate(SESSION_PLAN, { plan: plan })}/>
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

const SessionPlansList = connect(mapStateToProps)(SessionPlans);
export default SessionPlansList;
