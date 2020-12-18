import React from 'react';

type InputProps = {
    options: Array<{ label: string }>
}

export const Select = (props: InputProps) => (
    <select>
        {props.options.map(op => <option>{op.label}</option>)}
    </select>
);
