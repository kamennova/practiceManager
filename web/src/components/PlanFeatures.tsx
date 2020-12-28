import { ActivityType } from 'common/types/activity';
import { SessionPlan } from 'common/types/plan';
import React from 'react';

export const PlanFeatures = (props: { plan: SessionPlan }) => {
    return (
        <div className={'item-features'}>
            <Feature val={props.plan.schedule.filter(a => a.type === ActivityType.Piece).toString()} label='Pieces'/>
            <Feature val={props.plan.schedule.filter(a => a.type === ActivityType.Piece).toString()} label='Techinque'/>
            <Feature val={props.plan.schedule.filter(a => a.type === ActivityType.Piece).toString()}
                     label='Sight reading'/>
        </div>
    );
};

const Feature = (props: { label: string, val: string }) => (
    <div className={'item-feature'}>
        <span className={'feature-value'}>{props.val}</span>
        <span className={'feature-label'}>{props.label}</span>
    </div>
);
