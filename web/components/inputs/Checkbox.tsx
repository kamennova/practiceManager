import React from 'react';

type CheckboxProps = {
    label: string,
    value: boolean,
    onChange: (check: boolean) => void,
}

export const Checkbox = (props: CheckboxProps) => (
    <label><input type='checkbox' checked={props.value} onChange={(evt) => props.onChange(evt.target.value)}/>
        {props.label}
    </label>
);
