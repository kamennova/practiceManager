import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppPaddingStyle } from "../../AppStyle";
import { Font } from "../../sizes";
import { useTheme } from "../../theme";
import { ThemeColors } from "../../theme/colors";
import { DeviceSize, useDeviceSize } from "./adaptive/query";

type SectionProps = {
    children: JSX.Element | (JSX.Element| undefined)[],
    title: string,
    activeElem?: JSX.Element,
};

export const ItemSection = (props: SectionProps) => {
    const style = getStyles( useTheme().colors, useDeviceSize());
    return (
        <View style={style.wrap}>
            <View style={style.header}>
                <Text style={style.title}>{props.title}</Text>
                {props.activeElem ? props.activeElem : undefined}
            </View>
            {props.children}
        </View>
    );
};

const getStyles = (colors: ThemeColors, size: DeviceSize) => StyleSheet.create({
    wrap: {
        ...AppPaddingStyle,
        paddingTop: 15,
        paddingBottom: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 7,
    },
    title: {
        fontSize: Font.Normal[size],
        color: colors.colorFaded,
    },
});
