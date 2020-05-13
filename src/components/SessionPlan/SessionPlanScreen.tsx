import React, { useEffect, useState } from 'react';
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { AppPaddingStyle, TotalHeaderHeight } from "../../AppStyle";
import { getPlanById } from "../../db/plan";
import { StateShape } from "../../store/StoreState";
import { thunkDeletePlan, thunkTogglePlanFav } from "../../store/thunks/plan";
import { ActivitiesReport, getActivitiesReport } from "../../types/ActivitiesReport";
import { EmptyPlan } from "../../types/EmptyPlan";
import { ItemScreenProps } from "../../types/item/ItemScreen";
import { SessionPlan, SessionSchedule } from "../../types/SessionPlan";
import { getSideIds } from "../basic/Item/getSideIds";
import { ItemScreenWrapper } from "../basic/Item/ItemScreenWrapper";
import { ItemFeatures } from "../basic/Item/ItemFeatures";
import { ScreenTitle, SmallTitle } from "../basic/titles/Titles";
import { ActivityBlock } from "./ActivityBlock";

type PlanScreenProps = ItemScreenProps<{}>;

export const SessionPlanComponent = (props: PlanScreenProps) => {
    const [plan, setPlan] = useState<SessionPlan>(EmptyPlan);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getPlanById(props.route.params.id);
            if (result !== undefined) {
                setPlan(result);
            } else {
                throw new Error('Plan not found');
            }
        };

        fetchData();
    }, [props.route.params.id, props.route.params.lastUpdated]);

    const report = getActivitiesReport(plan.schedule);

    return (
        <ItemScreenWrapper route={props.route}
                           sideIds={props.sideIds}
                           deleteItem={props.deleteItem}
                           toggleItemFav={props.toggleItemFav}
                           item={plan}
                           setItem={(p: SessionPlan) => setPlan(p)}
                           itemName={'plan'}>

            <View style={{ ...AppPaddingStyle, marginTop: TotalHeaderHeight }}>
                <ScreenTitle>{plan.name}</ScreenTitle>
                <PlanFeatures report={report}/>
            </View>

            <Text style={{
                color: 'grey',
                fontSize: 16,
                ...AppPaddingStyle,
                marginTop: 20,
            }}>
                Total duration: {report.totalDuration / 60} minutes
            </Text>
            <SessionScheduleView schedule={plan.schedule}/>

        </ItemScreenWrapper>
    );
};

const PlanFeatures = (props: { report: ActivitiesReport }) => (
    <ItemFeatures items={[
        { label: 'Technique', val: props.report.technique / 60 + 'm' },
        { label: 'Pieces', val: props.report.pieces / 60 + 'm' },
        { label: 'Sight-reading', val: props.report.sightReading / 60 + 'm' },
    ]}/>
);

const SessionScheduleView = (props: { schedule: SessionSchedule }) => {
    return (
        <View style={{
            marginTop: 20,
            ...AppPaddingStyle
        }}>
            <SmallTitle>Schedule</SmallTitle>
            {props.schedule.map((act, i) => (
                <ActivityBlock isFirst={i === 0} isLast={i === props.schedule.length - 1} activity={act}/>))}
        </View>
    );
};

const mapStateToProps = (state: StateShape, ownProps: PlanScreenProps) => ({
        sideIds: getSideIds(state.plans.items, ownProps.route.params.id),
        preview: state.plans.items.find(i => i.id === ownProps.route.params.id),
    }
);

const mapDispatchToProps = (dispatch: any, ownProps: PlanScreenProps) => ({
    deleteItem: () => dispatch(thunkDeletePlan(ownProps.route.params.id)),
    toggleItemFav: () => dispatch(thunkTogglePlanFav(ownProps.route.params.id)),
});

export const SessionPlanScreen = connect(mapStateToProps, mapDispatchToProps)(SessionPlanComponent);
