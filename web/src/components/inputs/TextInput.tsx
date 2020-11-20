import React from 'react';

type InputProps = {
    value?: string,
    onChange: (val: string) => void,
    type?: 'text' | 'email' | 'password';
    name?: string
}

export const TextInput = (props: InputProps) => {
    return (
        <input name={props.name}
               value={props.value} onChange={(e) => props.onChange(e.target.value)} type={props.type || 'text'}/>
    );
};
