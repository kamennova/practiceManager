import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { ViewStyle } from "react-native";

type IconProps = {
    style?: ViewStyle,
}

export const CheckIcon = (props: IconProps) => (
    <MaterialIcons name='check' style={props.style} size={19} color={'white'}/>
);
