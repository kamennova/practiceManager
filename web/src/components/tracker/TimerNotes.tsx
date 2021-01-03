import { Note } from 'common/types/Note';
import React from 'react';

export const TimerNotes = (props: {notes?: Note[], onAdd: () => void}) => {
    return (
        <div className={'note-slider'}>
            {props.notes && props.notes.length > 0 ? props.notes?.map(n => n) : undefined}
        </div>
    );
};
