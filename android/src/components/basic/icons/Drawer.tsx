import React from "react";
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from "../../../theme";

const IconSize = 22;

export const DashboardIcon = () => (
    <FontAwesome size={15} name='bar-chart' color={useTheme().colors.color}/>
);

export const RepertoireIcon = () => (
    <MaterialCommunityIcons size={IconSize} name='playlist-music-outline' color={useTheme().colors.color}/>
);

export const PlansIcon = () => (
    <MaterialIcons size={IconSize} name='schedule' color={useTheme().colors.color}/>
);

export const SettingsIcon = () => (
    <MaterialCommunityIcons size={IconSize} name='settings' color={useTheme().colors.color}/>
);
