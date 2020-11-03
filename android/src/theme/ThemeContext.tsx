import React from 'react';
import { ThemeColors } from "./colors";
import { Theme } from "./Theme";

const DEFAULT_THEME = Theme.Light;

export const ThemeContext = React.createContext({
    theme: DEFAULT_THEME,
    colors: ThemeColors[DEFAULT_THEME],
    setTheme: (_: Theme) => {
    },
});

export const useTheme = () => React.useContext(ThemeContext);
