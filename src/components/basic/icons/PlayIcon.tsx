import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ViewStyle } from "react-native";

export const PlayIcon = (props: {color: string, style?: ViewStyle}) => {
    return (<Ionicons name='md-play' size={15} color={props.color} style={props.style}/>)
};
