import { PieceBase } from 'common/types/piece';
import React from 'react';

export const PieceFeatures = (props: PieceBase) => {
    return (
        <div className={'item-features'}>
            {props.author && <Feature value={props.author} icon={'person_outline'}/>}
            {props.complexity && <Feature value={props.complexity} icon={'signal_cellular_alt'}/>}
            {props.mood && <Feature value={props.mood} icon={'tag_faces'}/>}
        </div>
    );
};

const Feature = (props: { icon: string, value: string }) => (
    <div className={'item-feature'}>
        <i className={'material-icons'}> {props.icon}</i>
        <span className={'feature-label'}>{props.value}</span>
    </div>
);
