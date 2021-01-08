import { PieceBase } from 'common/types/piece';
import React from 'react';

export const PieceFeatures = (props: PieceBase) => {
    return (
        <div className={'item-features'}>
            {props.author && <Feature pic={props.author.picSrc} value={props.author.fullName} icon={'person_outline'}/>}
            {props.complexity && <Feature value={props.complexity} icon={'signal_cellular_alt'}/>}
            {props.mood && <Feature value={props.mood} icon={'tag_faces'}/>}
        </div>
    );
};

const Feature = (props: { icon: string, value: string, pic?: string }) => (
    <div className={'item-feature'}>
        {props.pic ? <img src={props.pic} className={'circle'} width={25} height={25} style={{ marginRight: 5 }}/> :
            <i className={'material-icons'}> {props.icon}</i>}
        <span className={'feature-label'}>{props.value}</span>
    </div>
);
