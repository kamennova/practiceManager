import React from 'react';
import { ViewStyle } from "react-native";
import { useTheme } from "../../../theme";
import { MaterialIcons } from '@expo/vector-icons';

export const PlayIcon = (props: { color: string, style?: ViewStyle }) => (
    <MaterialIcons size={20} style={props.style} color={props.color || useTheme().colors.color} name='play-arrow'/>
);
