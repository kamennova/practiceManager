import React, { useEffect, useState } from 'react';
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { ActivityViewStyle, AppPaddingStyle, BreakViewStyle } from "../../AppStyle";
import { getPlanById } from "../../db/plan";
import { StateShape } from "../../store/StoreState";
import { thunkDeletePiece, thunkTogglePieceFav } from "../../store/thunks";
import { ActivityType } from "../../types/Activity";
import { EmptyPlan } from "../../types/EmptyPlan";
import { ItemScreenProps } from "../../types/item/ItemScreen";
import { PlanActivity } from "../../types/PlanActivity";
import { SessionPlan, SessionSchedule, totalDurationInMinutes } from "../../types/SessionPlan";
import { getSideIds } from "../basic/Item/getSideIds";
import { ItemScreenWrapper } from "../basic/Item/ItemScreenWrapper";

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

    return (
        <ItemScreenWrapper route={props.route}
                           sideIds={props.sideIds}
                           deleteItem={props.deleteItem}
                           toggleItemFav={props.toggleItemFav}
                           item={plan}
                           setItem={(p: SessionPlan) => setPlan(p)}
                           itemName={'plan'}>
            <View style={{
                ...AppPaddingStyle
            }}>
                <Text style={{
                    color: 'grey',
                    fontSize: 16,
                }}>
                    Total duration: {totalDurationInMinutes(plan)} minutes
                </Text>
                <SessionScheduleView schedule={plan.schedule}/>
            </View>
        </ItemScreenWrapper>
    );
};

const SessionScheduleView = (props: { schedule: SessionSchedule }) => {
    return (
        <View style={{
            marginTop: 20
        }}>
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
    deletePiece: () => dispatch(thunkDeletePiece(ownProps.route.params.id)),
    togglePieceFav: () => dispatch(thunkTogglePieceFav(ownProps.route.params.id)),
});

export const SessionPlanScreen = connect(mapStateToProps, mapDispatchToProps)(SessionPlanComponent);
