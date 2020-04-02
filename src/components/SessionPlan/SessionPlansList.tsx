import { StackActions } from '@react-navigation/native';
import React from 'react';
import { FlatList, ScrollView } from "react-native";
import { connect } from "react-redux";
import { AppPaddingStyle } from "../../AppStyle";
import { SESSION_PLAN, SESSION_PLAN_FORM } from "../../NavigationPath";
import { StateShape } from "../../store/StoreState";
import { SessionPlan } from "../../types/SessionPlan";
import { NothingAlert } from "../basic/Alerts/NothingAlert";
import { AddButton } from "../basic/Buttons/ActionButton";
import { ScreenWrapper } from "../basic/ScreenWrapper";
import { SessionPlanItem } from "./SessionPlanItem";

const mapStateToProps = (state: StateShape) => ({
    plans: state.plans.items,
});

const SessionPlans = (props: { plans: SessionPlan[], navigation: any }) => {
    const push = (path: string, opt?: any) => () => props.navigation.dispatch(StackActions.push(path, opt));

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={style}>
                {props.plans.length === 0 ? <NothingAlert/> : undefined }
                <FlatList data={props.plans}
                          renderItem={({ item }) => (
                              <SessionPlanItem plan={item} onPress={push(SESSION_PLAN, { plan: item })}/>)}/>
            </ScrollView>
            <AddButton onPress={push(SESSION_PLAN_FORM)}/>
        </ScreenWrapper>
    );
};

const style = { ...AppPaddingStyle, paddingTop: 10, paddingBottom: 30, minHeight: '100%' };

const SessionPlansList = connect(mapStateToProps)(SessionPlans);
export default SessionPlansList;
