import React from 'react';

type InputProps = {
    options: Array<{ label: string }>,
    onChange: (s: string) => void,
}

export const Select = (props: InputProps) => (
    <select onChange={(e) => props.onChange(e.target.value)}>
        {props.options.map(op => <option>{op.label}</option>)}
    </select>
);
