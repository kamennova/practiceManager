import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from "../../../theme";

export const MenuIcon = () => (
    <Ionicons name='md-menu' size={30} color={useTheme().colors.color}/>
);
