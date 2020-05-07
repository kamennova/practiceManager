import { Theme } from "./Theme";

export const ThemeColors: { [key in Theme]: ThemeColors } = {
    [Theme.Light]: {
        color: 'black',
        headerBg: '#f1f1f3',
        appBg: 'white',
        appBgFaded: 'rgba(241, 241, 243, 0.5)',
        appBgLight: '#e6edff',
        primary: '#6895ff',
        border: 'lightgrey',
        borderFaded: '#dedede',
        colorFaded: 'grey',
    },
    [Theme.Dark]: {
        color: '#b9b9b9',
        headerBg: '#1b1b1b',
        appBg: '#1f1f1f',
        appBgFaded: 'rgba(31, 31, 31, 0.5)',
        appBgLight: '#1b1b1b',
        primary: '#6895ff',
        border: 'black',
        borderFaded: '#383838',
        colorFaded: 'grey',
    },
};

export type ThemeColors = {
    appBg: string,
    appBgFaded: string,
    appBgLight: string,
    headerBg: string,
    primary: string,
    color: string,
    colorFaded: string,
    border: string,
    borderFaded: string,
}

export const getThemeColors = (theme: Theme) => ThemeColors[theme];
