import React from 'react';

type InputProps = {
    value?: string,
    onChange: (val: string) => void,
    type?: 'text' | 'email' | 'password';
    name?: string,
    onBlur?: () => void,
    onKeyPress?: (k: string) => void,
    placeholder?: string,
}

export const TextInput = (props: InputProps) => {
    // @ts-ignore
    const onPress = props.onKeyPress !== undefined ? (e) => props.onKeyPress(e.key) : undefined;
    return (
        <input name={props.name}
               onBlur={props.onBlur}
               onKeyPress={onPress}
               placeholder={props.placeholder}
               value={props.value}
               onChange={(e) => props.onChange(e.target.value)}
               type={props.type || 'text'}/>
    );
};
