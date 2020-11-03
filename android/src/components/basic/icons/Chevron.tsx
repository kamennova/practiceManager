import { MaterialIcons } from '@expo/vector-icons';
import React from "react";
import { useTheme } from "../../../theme";
import { Direction } from "../../../types/Direction";

type IconProps = {
    size?: number,
    color?: string,
    direction?: Direction,
};

export const ChevronIcon = (props: IconProps) => {
    const color = props.color || useTheme().colors.color;
    const degs = 90 * (props.direction !== undefined ? props.direction : 0);

    return (
        <MaterialIcons size={props.size || 20} style={{ transform: [{ rotate: degs + 'deg' }] }}
                       name='chevron-left' color={color}/>
    );
};
