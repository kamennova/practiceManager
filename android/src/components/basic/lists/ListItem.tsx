import React from 'react';
import { View, ViewStyle } from "react-native";

type ItemWrapperProps = {
    children: JSX.Element | string | JSX.Element[],
    style?: ViewStyle,
}

export const ListItemWrapper = (props: ItemWrapperProps) => (
    <View style={{
        borderWidth: 0.5,
        borderColor: 'darkgrey',
        padding: 10,
        marginBottom: 12,
        ...props.style
    }}>
        {props.children}
    </View>
);
