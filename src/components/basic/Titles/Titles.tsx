import React from 'react';
import { Text, TextStyle } from 'react-native';

export type TitleProps = {
    children: string | string[],
    style?: TextStyle,
}

export const ScreenTitle = (props: TitleProps) => (
    <Text style={{
        marginBottom: 5,
        color: 'black',
        fontSize: 25,
        ...props.style
    }}>
        {props.children}
    </Text>
);

export const SmallTitle = (props: { children: string }) => (
    <Text style={{ marginBottom: 7, color: 'grey' }}>
        {props.children}
    </Text>
);
