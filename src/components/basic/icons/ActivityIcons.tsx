import React from "react";
import { Dark } from "../../../AppStyle";
import { MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons';

export const BreakIcon = () => (
    <MaterialIcons name='free-breakfast' size={24} color={Dark}/>
);

export const EyeIcon = () => (
    <FontAwesome name='eye' size={24} color={Dark}/>
);

export const MusicIcon = () => (
    <Entypo name='music' size={24} color={Dark}/>
);

export const BoltIcon = () => (
    <FontAwesome name='bolt' size={22} color={Dark}/>
);
