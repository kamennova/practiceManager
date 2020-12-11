import React from 'react';

type CheckboxProps = {
    label: string,
    value: boolean,
    onChange: (check: boolean) => void,
    name?: string,
}

export const Checkbox = (props: CheckboxProps) => (
    <label>
        <input name={props.name}
               type='checkbox' checked={props.value} onChange={() => props.onChange(!props.value)}/>
        {props.label}
    </label>
);
