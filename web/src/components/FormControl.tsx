import React from 'react';

type ControlProps = {
    label: string,
    children: JSX.Element
}

export const FormControl = (props: ControlProps) => (
    <div className={'form-control'}>
        <label> {props.label} </label>
        {props.children}
    </div>
);
