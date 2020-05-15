import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from "../../../theme";

type IconProps = {
    size?: number,
}

export const TrashIcon = (props: IconProps) => (
    <MaterialCommunityIcons name='trash-can-outline' size={21} color={useTheme().colors.color}/>
);
