import React, { useEffect, useState } from 'react';
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { ActivityViewStyle, AppPaddingStyle, BreakViewStyle, TotalHeaderHeight } from "../../AppStyle";
import { getPlanById } from "../../db/plan";
import { StateShape } from "../../store/StoreState";
import { thunkDeletePlan, thunkTogglePlanFav } from "../../store/thunks/plan";
import { ActivitiesReport, getActivitiesReport } from "../../types/ActivitiesReport";
import { ActivityType } from "../../types/Activity";
import { EmptyPlan } from "../../types/EmptyPlan";
import { ItemScreenProps } from "../../types/item/ItemScreen";
import { PlanActivity } from "../../types/PlanActivity";
import { SessionPlan, SessionSchedule } from "../../types/SessionPlan";
import { getSideIds } from "../basic/Item/getSideIds";
import { ItemScreenWrapper } from "../basic/Item/ItemScreenWrapper";
import { ItemFeatures } from "../basic/ItemFeatures";
import { SmallTitle } from "../basic/Titles/Titles";

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
                <PlanFeatures report={report}/>
            </View>

            <Text style={{
                color: 'grey',
                fontSize: 16,
                ...AppPaddingStyle,
                marginTop: 54,
            }}>
                Total duration: {report.totalDuration} minutes
            </Text>
            <SessionScheduleView schedule={plan.schedule}/>

        </ItemScreenWrapper>
    );
};

const PlanFeatures = (props: { report: ActivitiesReport }) => (
    <ItemFeatures items={[
        { label: 'Technique', val: props.report.technique + 'm' },
        { label: 'Pieces', val: props.report.pieces + 'm' },
        { label: 'Sight-reading', val: props.report.sightReading + 'm' },
    ]}/>
);

const SessionScheduleView = (props: { schedule: SessionSchedule }) => {
    return (
        <View style={{
            marginTop: 20,
            ...AppPaddingStyle
        }}>
            <SmallTitle>Schedule</SmallTitle>
            {props.schedule.map(activity => <ActivityView activity={activity}/>)}
        </View>
    );
};

const ActivityView = (props: { activity: PlanActivity }) => {
    const bg = getActivityColor(props.activity.type);
    const otherStyles = props.activity.type === ActivityType.Break ? BreakViewStyle : {};

    return (
        <View style={{
            ...ActivityViewStyle,
            ...otherStyles,
            backgroundColor: bg,
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Text style={{
                    fontSize: 18,
                }}>
                    {props.activity.type}
                </Text>
                <Text style={{
                    fontSize: 15,
                    color: 'rgb(0, 0, 12)',
                    marginLeft: 'auto',
                }}>
                    {props.activity.duration} min
                </Text>
            </View>
        </View>
    );
};

const getActivityColor = (activity: ActivityType): string => {
    switch (activity) {
        case ActivityType.Break:
            return 'transparent';
        case ActivityType.Piece:
            return '#d0dbff';
        case ActivityType.Technique:
            return '#b3d4d6';
        case ActivityType.SightReading:
            return 'brown';
    }
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
