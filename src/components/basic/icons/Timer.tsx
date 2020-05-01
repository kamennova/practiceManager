import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { useTheme } from "../../../theme";

type IconProps = {
    size?: number,
}

export const TimerIcon = (props: IconProps) => (
    <MaterialIcons name='timer' size={props.size ? props.size : 24} color={useTheme().colors.color}/>
);

export const TimerOffIcon = (props: IconProps) => (
    <MaterialIcons name='timer-off' size={props.size ? props.size : 24} color={useTheme().colors.color}/>
);
