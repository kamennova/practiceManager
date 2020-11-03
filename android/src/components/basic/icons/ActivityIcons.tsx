import React from "react";
import { Dark } from "../../../AppStyle";
import { MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons';

type IconProps = {
    size?: number,
}

export const BreakIcon = (props: IconProps) => (
    <MaterialIcons name='free-breakfast' size={props.size ? props.size : 24} color={Dark}/>
);

export const EyeIcon = (props: IconProps) => (
    <FontAwesome name='eye' size={props.size ? props.size : 24} color={Dark}/>
);

export const MusicIcon = (props: IconProps) => (
    <Entypo name='music' size={props.size ? props.size : 24} color={Dark}/>
);

export const BoltIcon = (props: IconProps) => (
    <FontAwesome name='bolt' size={props.size ? props.size : 22} color={Dark}/>
);
