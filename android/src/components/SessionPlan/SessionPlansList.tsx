import { StackActions } from '@react-navigation/native';
import React, { Component } from 'react';
import { FlatList, ScrollView } from "react-native";
import { connect } from "react-redux";
import { AppPaddingStyle } from "../../AppStyle";
import { SESSION_PLAN, SESSION_PLAN_FORM } from "../../NavigationPath";
import { StateShape } from "../../store/StoreState";
import { ActionType } from "../../types/ActionType";
import { SessionPlan } from "../../types/plan";
import { NothingAlert } from "../basic/alerts/NothingAlert";
import { AddButton } from "../basic/buttons/ActionButton";
import { ScreenWrapper } from "../basic/ScreenWrapper";
import { SessionPlanItem } from "./SessionPlanItem";

type ListProps = {
    plans: SessionPlan[],
    getPlans: () => void,
    navigation: any,
};

class SessionPlans extends Component<ListProps> {
    push = (path: string, opt?: any) => () => this.props.navigation.dispatch(StackActions.push(path, opt));

    render() {
        return (
            <ScreenWrapper>
                <ScrollView contentContainerStyle={style}>
                    {this.props.plans.length === 0 ? <NothingAlert/> : undefined}
                    <FlatList
                        contentContainerStyle={{flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between'}}
                        data={this.props.plans}
                        renderItem={({ item }) => (
                            <SessionPlanItem plan={item}
                                             onPress={this.push(SESSION_PLAN, { id: item.id, plan: item })}/>)}/>
                </ScrollView>
                <AddButton onPress={this.push(SESSION_PLAN_FORM, {mode: ActionType.Create})}/>
            </ScreenWrapper>
        );
    }
}

const style = { ...AppPaddingStyle, paddingTop: 10, paddingBottom: 30, minHeight: '100%' };

const mapStateToProps = (state: StateShape) => ({
    plans: state.plans.items,
});

const SessionPlansList = connect(mapStateToProps)(SessionPlans);
export default SessionPlansList;
