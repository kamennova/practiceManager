import React from "react";
import { PieceStatus } from "../../types/Piece";
import { minutesToHumanlyFormat } from "../../utils/time";
import { ItemFeatures } from "../basic/ItemFeatures";

export const PieceFeatures = (props: { status: PieceStatus, timeSpent: number, lastPracticed?: Date }) => (
    <ItemFeatures items={[{ label: 'Status', val: props.status !== undefined ? props.status : 'In work' },
        { label: 'Time spent', val: minutesToHumanlyFormat(props.timeSpent) },
        {
            label: 'Last practiced',
            val: props.lastPracticed !== undefined ? props.lastPracticed.toDateString() : 'Never'
        }]}/>
);
