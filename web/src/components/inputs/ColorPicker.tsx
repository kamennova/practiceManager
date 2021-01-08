import React from "react";
import { FormControl } from "../FormControl";
import { Select } from "./Select";

export const ColorPicker = (props: { value?: string, onChange: (c: string) => void }) => {
    return (
        <FormControl label={'color'}>
            <Select options={Colors} onChange={props.onChange} value={props.value}/>
        </FormControl>
    );
};

const Colors = [
    { value: 'red', label: 'red' },
    { value: 'green', label: 'green' },
    { value: 'blue', label: 'blue' },
    { value: 'yellow', label: 'yellow' },
];
