import React from 'react';
import { Text, TextStyle } from 'react-native';

export type TitleProps = {
    children: string | string[],
    style?: TextStyle,
}

export const ScreenTitle = (props: TitleProps) => (
    <Text style={{
        marginBottom: 10,
        color: 'black',
        fontSize: 22,
        fontWeight: 'bold',
        ...props.style
    }}>
        {props.children}
    </Text>
);
