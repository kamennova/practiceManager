import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Font } from "../../../sizes";
import { DEFAULT_THEME, ThemeColors, useTheme } from "../../../theme";
import { DeviceSize, useDeviceSize } from "../adaptive/query";

export type TitleProps = {
    children: string | string[],
}

export const ScreenTitle = (props: TitleProps) => {
    const size = useDeviceSize();
    const style = styles(useTheme().colors, size);

    return (
    <Text style={style.screen}>
        {props.children}
    </Text>
)};

export const SmallTitle = (props: { children: string }) => (
    <Text style={styles(useTheme().colors, useDeviceSize()).small}>
        {props.children}
    </Text>
);

const styles = (colors: ThemeColors = ThemeColors[DEFAULT_THEME], size: DeviceSize) => StyleSheet.create({
    screen: {
        marginBottom: 5,
        color: colors.color,
        fontSize: Font.Largest[size],
    },
    small: { marginBottom: 7, color: colors.colorFaded },
});
