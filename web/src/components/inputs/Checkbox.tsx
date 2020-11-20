import React from 'react';

type CheckboxProps = {
    label: string,
    value: boolean,
    onChange: (check: boolean) => void,
    name?: string,
}

export const Checkbox = (props: CheckboxProps) => (
    <label><input name={props.name}
        type='checkbox' checked={props.value} onChange={(evt) => props.onChange(evt.target.value === 'true')}/>
        {props.label}
    </label>
);
