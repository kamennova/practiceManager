import { Activity, ActivityType } from 'common/types/activity';
import * as React from "react";
import { useState } from "react";
import { PieceSelect } from "./PieceSelect";

export const ActivityInput = (props: { act: Activity, onChoose: (t: Activity) => void }) => {
    const [type, setType] = useState(props.act.type);
    const [pieceId, setPieceId] = useState(undefined);

    const showPieceSelect = type !== ActivityType.Break;

    return (
        <div style={{ maxWidth: 500 }}>
            <ActivityTypeSelect onChange={setType} current={type}/>
            {showPieceSelect && <PieceSelect value={pieceId} onChange={(v: string, id: number) => setPieceId(id)}/>}
        </div>
    );
};

const ActivityTypeSelect = (props: { current: ActivityType, onChange: (t: ActivityType) => void }) => (
    <ul className={'activity-buttons'}>
        {Object.values(ActivityType).map(t => (<li key={t}>
            <ActivityBtn type={t} isSelected={t === props.current} onClick={() => props.onChange(t)}/>
        </li>))}
    </ul>
);

const ActivityIcons: Icons = {
    [ActivityType.Piece]: 'library_music',
    [ActivityType.SightReading]: 'remove_red_eye',
    [ActivityType.Break]: 'free_breakfast',
    [ActivityType.Technique]: 'pan_tool',
};

const ActivityBtn = (props: { type: ActivityType, isSelected: boolean, onClick: () => void }) => (
    <span className={'activity-btn ' + (props.isSelected ? 'selected' : '')}
          onClick={props.onClick}>
        <i className={'material-icons'}>{ActivityIcons[props.type]}</i><br/>
        <label>
            <input type={'radio'} className={'visually-hidden'} checked={props.isSelected}/>
            <span>{props.type}</span>
        </label>
    </span>
);

type Icons = { [key: ActivityType]: string };
