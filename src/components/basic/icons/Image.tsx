import React from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from "../../../theme";

export const ImageIcon = () => (
    <MaterialCommunityIcons size={20} color={useTheme().colors.color} name='image-outline'/>
);
