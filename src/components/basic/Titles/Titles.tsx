import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { DEFAULT_THEME, ThemeColors } from "../../../theme";
import { useTheme } from "../../../theme";

export type TitleProps = {
    children: string | string[],
}

export const ScreenTitle = (props: TitleProps) => {
    const style = styles(useTheme().colors);
    console.log(useTheme().colors);

    return (
    <Text style={style.screen}>
        {props.children}
    </Text>
)};

export const SmallTitle = (props: { children: string }) => (
    <Text style={styles(useTheme().colors).small}>
        {props.children}
    </Text>
);

const styles = (colors: ThemeColors = ThemeColors[DEFAULT_THEME]) => StyleSheet.create({
    screen: {
        marginBottom: 5,
        color: colors.color,
        fontSize: 22,
    },
    small: { marginBottom: 7, color: colors.colorFaded },
});
