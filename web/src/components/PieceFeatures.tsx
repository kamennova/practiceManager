import React from 'react';
import { PieceBase } from 'common/types/piece';

export const PieceFeatures = (props: { piece: PieceBase }) => {
    return (
        <div className={'item-features'}>
            <Feature val={props.piece.timeSpent.toString()} label='Time spent'/>
            <Feature val={props.piece.lastPracticedOn === undefined ? 'Never' : props.piece.lastPracticedOn.toString()}
                     label='Last practiced'/>
            <Feature val={props.piece.status} label={'Status'} />
        </div>
    );
};

const Feature = (props: { label: string, val: string }) => (
    <div className={'item-feature'}>
        <span className={'feature-value'}>{props.val}</span>
        <span className={'feature-label'}>{props.label}</span>
    </div>
);
