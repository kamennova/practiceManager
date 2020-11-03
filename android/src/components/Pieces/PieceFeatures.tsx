import React from "react";
import { PieceStatus } from "../../types/piece";
import { formatDateDiff, secondsToHumanlyFormat } from "../../utils/time";
import { ItemFeatures } from "../basic/Item/ItemFeatures";

export const PieceFeatures = (props: { status: PieceStatus, timeSpent: number, lastPracticed?: Date }) => (
    <ItemFeatures items={[
        { label: 'Status', val: props.status !== undefined ? props.status : 'In work' },
        { label: 'Time spent', val: secondsToHumanlyFormat(props.timeSpent) },
        {
            label: 'Last practiced',
            val: props.lastPracticed !== undefined ? formatDateDiff(props.lastPracticed) : 'Never'
        }]}/>
);
