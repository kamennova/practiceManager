import React from 'react';

type InputProps = {
    value: string,
    onChange: (val: string) => void,
    type?: 'text' | 'email' | 'password';
}

export const TextInput = (props: InputProps) => {
    return (
        <input value={props.value} onChange={(e) => props.onChange(e.target.value)} type={props.type || 'text'}/>
    );
};
