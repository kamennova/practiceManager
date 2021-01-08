import { useState } from "react";
import * as React from "react";
import { TextInput } from "./TextInput";

type InputProps = {
    values: string[],
    onChange: (t: string[]) => void,
    placeholder?: string,
};

const separator = ' ';

export const MultipleInput = (props: InputProps) => {
    const [newTag, setNewTag] = useState('');

    const sendTag = () => {
        const last = newTag.length - 1;
        const input = (newTag[last] === separator ? newTag.slice(0, last) : newTag).trim();
        setNewTag('');

        if (input !== '' && props.values.find(v => v === input) === undefined) {
            props.onChange([...props.values, input]);
        }
    };

    const removeTag = (t: string) => {
        props.onChange(props.values.filter(item => item !== t));
    };

    return (
        <p className={'tag-input'}>
            <TextInput
                onBlur={sendTag}
                value={newTag}
                onChange={setNewTag}
                onKeyPress={(key) => {
                    if (key === separator) sendTag();
                }}
                placeholder={props.placeholder !== undefined ? props.placeholder : `Separated by space`}
            />
            <ul className={'tags-list'}>
                {props.values.map(v => (<li key={v} className={'tag'}>
                    {v}
                    <i className={'material-icons delete-tag'} onClick={() => removeTag(v)}>close</i>
                    </li>))}
            </ul>
        </p>
    );
};
