import { PieceBase } from 'common/types/piece';
import React from "react";
import { ItemStats } from "../Item/ItemFeatures";

export const PieceStats = (props: PieceBase) => (
    <ItemStats items={[{ label: 'Time spent', value: props.timeSpent.toString() },
        {label: 'Last practiced', value: props.lastPracticedOn === undefined ? 'Never' : props.lastPracticedOn.toString()},
        {label: 'Status', value: props.status}]}/>
);
