import React from 'react';
import { MyTextInput } from "./TextInput";


type DaysInputProps = {
    onChange: (val: string) => void,
    value?: string,
}

export const DaysInput = (props: DaysInputProps) => {
    return (
        <MyTextInput style={{width: 40}} keyboardType={'numeric'} onChangeText={props.onChange} value={props.value}/>
    );
};
