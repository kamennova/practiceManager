import React from 'react';
import { View, ViewStyle } from "react-native";

export const Divider = (props: {style?: ViewStyle}) => (
    <View style={{
        width: '100%',
        height: 1,
        backgroundColor: 'lightgrey',
        marginBottom: 15,
        marginTop: 15,
        ...props.style,
    }}/>
);
