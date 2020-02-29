import React from 'react';
import {Text} from 'react-native';

type TitleProps = {
    children: string | string[],
}

export const ScreenTitle = (props: TitleProps) => (
    <Text style={{
        marginBottom: 10,
        color: 'black',
        fontSize: 22,
        fontWeight: 'bold',
    }}>
        {props.children}
    </Text>
);
